package main

import (
	"github.com/gin-gonic/gin"
	"github.com/useradityaa/video-backend/routes"
)

func main() {
	r := gin.Default()

	routes.SetUpRoutes(r)

	r.Run(":8080")
}
