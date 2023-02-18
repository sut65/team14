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
			r.PUT("/booking", controller.UpdateBooking)
			r.DELETE("/booking/:id", controller.DeleteBooking)
			r.GET("/bookings/room/:id", controller.ListBookingsbyRoom)
			r.GET("/booking/code/:code", controller.GetBookingbyCode)
			r.GET("notapprove/booking/code/:code", controller.GetBookingbyCodeThatNotApprove)
			r.GET("notapprove/bookings", controller.ListBookingsThatNotApprove)
			r.GET("approve/booking/code/:code", controller.GetBookingbyCodeThatApprove)
			r.GET("/bookings/user/:id", controller.ListBookingsByUser)

			// Room Routes
			r.POST("/room", controller.CreateRoom)
			r.GET("/rooms/building/:id", controller.ListRoomsbyBuilding)
			r.GET("/rooms", controller.ListRooms)
			r.GET("/room/:id", controller.GetRoom)
			r.PUT("/room", controller.UpdateRoom)
			r.GET("/typerooms", controller.ListTyperooms)
			r.DELETE("/room/:id", controller.DeleteRoom)

			// Building Routes
			r.POST("/building", controller.CreateBuilding)
			r.GET("/buildings", controller.ListBuildings)
			r.GET("/building/:id", controller.GetBuilding)
			r.PUT("/building", controller.UpdateBuilding)
			r.DELETE("/building/:id", controller.DeleteBuilding)

			// Objective Routes
			r.GET("/objectives", controller.ListObjectives)
			r.GET("/objective/:id", controller.GetObjective)

			// User Routes
			r.POST("/user", controller.CreateUser)
			r.GET("/users", controller.ListUsers)
			r.GET("/user/:id", controller.GetUser)
			r.GET("/User/StudentID/:StudentID", controller.GetUserByStudentID)
			r.GET("/educationlevels", controller.ListEducationLevels)
			r.GET("/genders", controller.ListGenders)
			r.GET("/roles", controller.ListRoles)
			r.DELETE("/user/:id", controller.DeleteUser)
			r.PATCH("/user", controller.UpdateUser)

			// Appprove Routes
			r.GET("/approves", controller.ListApproves)
			r.GET("/approve/:id", controller.GetApprove)
			r.POST("/approve", controller.CreateApprove)
			r.PUT("/approve", controller.UpdateApprove)
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
			r.GET("/order_foods", controller.ListOrder_food)
			r.GET("/order_food/:id", controller.GetOrder_food)
			r.GET("/order_foods/Booking/code/:code", controller.ListOrderByBookingCode)
			r.POST("/order_food", controller.CreateOrder_food)
			r.PUT("/order_food", controller.UpdateOrder_food)
			r.DELETE("/order_food/:id", controller.DeleteOrder_food)

			// Borrow
			r.POST("/borrow", controller.CreateBorrow)
			r.GET("/borrow/:id", controller.GetBorrow)
			r.GET("/borrows", controller.ListBorrows)
			r.DELETE("/borrow/:id", controller.DeleteBorrow)
			r.PATCH("/borrow/:id", controller.UpdateBorrow)

			// Payback
			r.POST("/paybacks", controller.CreatePayback)
			r.GET("/payback/:id", controller.GetPayback)
			r.GET("/paybacks", controller.ListPaybacks)
			r.DELETE("/payback/:id", controller.DeletePayback)
			r.PATCH("/payback/:id", controller.UpdatePayback)

			// Device
			r.POST("/device", controller.CreateDevice)
			r.GET("/device/:id", controller.GetDevice)
			r.GET("/devices", controller.ListDevices)
			r.DELETE("/device/:id", controller.DeleteDevice)
			r.PUT("/device", controller.UpdateDevice)

			r.GET("/brands", controller.ListBrands)

			//DeviceType use by borrow
			r.GET("/device_types", controller.ListDeviceType)
			r.GET("/devices/device_type/:id", controller.ListTypebyDevice)
			// r.GET("/devices",controller.ListStatus_Device)

			// Guard
			r.GET("/guards", controller.ListGuards)

			// Company
			r.GET("/companies", controller.ListCompanies)

			// Food_and_Drink
			r.POST("/food_and_drink", controller.CreateFood_and_Drink)
			r.GET("/food_and_drink/:id", controller.GetFood_and_Drink)
			r.GET("/food_and_drinks", controller.ListFood_and_Drinks)
			r.GET("/shops", controller.ListShops)
			r.GET("/foodtypes", controller.ListFoodtypes)
			r.DELETE("/food_and_drink/:id", controller.DeleteFood_and_Drink)
			r.PATCH("/food_and_drink", controller.UpdateFood_and_Drink)
		}
	}

	// login User Route
	r.POST("/login", controller.Login)

	// Run the server
	r.Run()

}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}
