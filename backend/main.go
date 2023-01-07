package main

import (
	"github.com/sut65/team14/controller"

	"github.com/sut65/team14/entity"

	"github.com/gin-gonic/gin"
)

func main() {

	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	// Booking Routes
	r.GET("/bookings", controller.ListBookings)
	r.GET("/booking/:id", controller.GetBooking)
	r.POST("/booking", controller.CreateBooking)
	r.PATCH("/booking", controller.UpdateBooking)
	r.DELETE("/booking/:id", controller.DeleteBooking)
	r.GET("/bookings/room/:id", controller.ListBookingsbyRoom)

	// Run the server

	r.Run()

}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}
