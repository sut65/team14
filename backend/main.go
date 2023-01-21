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

	// router := r.Group("/")
	{
		// router.Use(middlewares.Authorizes())
		{
			// Booking Routes
			r.GET("/bookings", controller.ListBookings)
			r.GET("/booking/:id", controller.GetBooking)
			r.POST("/booking", controller.CreateBooking)
			r.PATCH("/booking", controller.UpdateBooking)
			r.DELETE("/booking/:id", controller.DeleteBooking)
			r.GET("/bookings/room/:id", controller.ListBookingsbyRoom)

			// Room Routes
			r.GET("/rooms/building/:id", controller.ListRoomsbyBuilding)
			r.GET("/rooms", controller.ListRooms)
			r.GET("/room/:id", controller.GetRoom)

			// Building Routes
			r.GET("/buildings", controller.ListBuildings)
			r.GET("/building/:id", controller.GetBuilding)

			// Objective Routes
			r.GET("/objectives", controller.ListObjectives)
			r.GET("/objective/:id", controller.GetObjective)

			// User Routes
			r.GET("/users", controller.ListUsers)
			r.GET("/user/:id", controller.GetUser)
		}
	}
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
