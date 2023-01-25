package main

import (
	"github.com/sut65/team14/controller"
	"github.com/sut65/team14/middlewares"

	"github.com/sut65/team14/entity"

	"github.com/gin-gonic/gin"
)

//const PORT = "8080"

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
			r.GET("/booking/code/:code", controller.GetBookingbyCode)
			r.GET("/booking/notapprove/code/:code", controller.GetBookingbyCodeThatNotApprove)

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

			// Add Friend Routes
			r.GET("/add_friends", controller.ListAdd_friend)
			r.GET("/add_friend/:id", controller.GetAdd_friend)
			r.POST("/add_friend", controller.CreateAdding_Friend)
			r.PATCH("/add_friend", controller.UpdateAddfriend)
			r.DELETE("/add_friends/:id", controller.DeleteAdd_friend)

			// Order food Routes
			r.GET("/order_foods", controller.ListAdd_friend)
			r.GET("/order_food/:id", controller.GetAdd_friend)
			r.POST("/order_food", controller.CreateAdding_Friend)
			r.PATCH("/order_food", controller.UpdateAddfriend)
			r.DELETE("/order_foods/:id", controller.DeleteAdd_friend)

			// Borrow
			r.POST("/borrow", controller.CreateBorrow)
			r.GET("/borrow/:id", controller.GetBorrow)
			r.GET("/borrows", controller.ListBorrows)
			r.DELETE("/borrow", controller.DeleteBorrow)
			r.PATCH("/borrow/:id", controller.UpdateBorrow)

			// Device
			r.POST("/device", controller.CreateDevice)
			r.GET("/decive/:id", controller.GetDevice)
			r.GET("/devices", controller.ListDevices)
			r.DELETE("/device/:id", controller.DeleteDevice)
			r.GET("/devices/type/:id", controller.ListTypebyDevice)
			r.PATCH("/device", controller.UpdateDevice)

			// Guard
			r.GET("/guards", controller.ListGuards)

			// Company
			r.GET("/companies", controller.ListCompanies)

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
