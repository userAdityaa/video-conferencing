package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/useradityaa/video-backend/handlers"
)

func SetUpRoutes(r *gin.Engine) {
	// Auth routes
	r.POST("/api/auth/google", handlers.GoogleAuthHandler)
	r.GET("/api/auth/verify", handlers.VerifyTokenHandler)
}
