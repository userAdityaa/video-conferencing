package handlers

import (
	"context"
	"crypto/rand"
	"encoding/base64"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/idtoken"
)

var (
	googleOauthConfig *oauth2.Config
	oauthStateString  string
	jwtSecret         []byte
)

func init() {
	googleOauthConfig = &oauth2.Config{
		RedirectURL:  os.Getenv("GOOGLE_REDIRECT_URL"),
		ClientID:     os.Getenv("GOOGLE_CLIENT_ID"),
		ClientSecret: os.Getenv("GOOGLE_CLIENT_SECRET"),
		Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"},
		Endpoint:     google.Endpoint,
	}

	b := make([]byte, 32)

	_, err := rand.Read(b)

	if err != nil {
		log.Fatal("Failed to generate state string.", err)
	}

	oauthStateString = base64.StdEncoding.EncodeToString(b)

	jwtSecret = []byte(os.Getenv("JWT_SECRET"))
}

type GoogleAuthRequest struct {
	Token string `json:"token"`
}

type Claims struct {
	UserID string `json:"userId"`
	jwt.RegisteredClaims
}

func GoogleAuthHandler(c *gin.Context) {
	var req GoogleAuthRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Request"})
		return
	}

	//verify google id token
	payload, err := verifyGoogleToken(req.Token)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid Google Token"})
	}

	//extract info from payload
	email := payload["email"].(string)
	name := payload["name"].(string)
	googleID := payload["sub"].(string)

	expirationTime := time.Now().Add(24 * time.Hour)
	claims := &Claims{
		UserID: googleID,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtSecret)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
	}

	c.JSON(http.StatusOK, gin.H{
		"token": tokenString,
		"user": gin.H{
			"id":    googleID,
			"name":  name,
			"email": email,
		},
	})
}

func verifyGoogleToken(tokenString string) (map[string]interface{}, error) {
	ctx := context.Background()
	validator, err := idtoken.NewValidator(ctx)
	if err != nil {
		return nil, fmt.Errorf("token verification failed: %v", err)
	}

	payload, err := validator.Validate(ctx, tokenString, os.Getenv("GOOGLE_CLIENT_ID"))
	if err != nil {
		return nil, fmt.Errorf("invalid ID token: %v", err)
	}

	return payload.Claims, nil
}

func VerifyTokenHandler(c *gin.Context) {
	authHeader := c.GetHeader("Authorization")
	if authHeader == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header missing"})
		return
	}

	tokenString := authHeader[len("Bearer "):]
	claims := &Claims{}

	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtSecret, nil
	})

	if err != nil {
		if errors.Is(err, jwt.ErrSignatureInvalid) {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token signature"})
			return
		}
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid token"})
		return
	}

	if !token.Valid {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token is invalid"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"user": gin.H{
			"id": claims.UserID,
		},
	})
}
