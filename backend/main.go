package main

import (
	"github.com/sut65/team14/controller"
	"github.com/sut65/team14/middlewares"

	"github.com/sut65/team14/entity"

	"github.com/gin-gonic/gin"
)

const PORT = "8080"

func main() {

	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	api := r.Group("/")
	{
		// protected :=
		api.Use(middlewares.Authorizes())
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

			// Appprove Routes
			r.GET("/approves", controller.ListApproves)
			r.GET("/approve/:id", controller.GetApprove)
			r.POST("/approve", controller.CreateApprove)
			r.PATCH("/approve", controller.UpdateApprove)
			r.DELETE("/approve/:id", controller.DeleteApprove)
			// r.POST("/approveCode", controller.GetApproveByCode)

			// Status Book
			r.GET("/statusBooks", controller.ListStatusBooks)
			r.GET("/statusBook/:id", controller.GetStatusBook)

		}
	}
	// Run the server

	r.Run("localhost: " + PORT)

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
