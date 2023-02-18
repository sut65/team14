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
			api.GET("/bookings", controller.ListBookings)
			api.GET("/booking/:id", controller.GetBooking)
			api.POST("/booking", controller.CreateBooking)
			api.PUT("/booking", controller.UpdateBooking)
			api.DELETE("/booking/:id", controller.DeleteBooking)
			api.GET("/bookings/room/:id", controller.ListBookingsbyRoom)
			api.GET("/booking/code/:code", controller.GetBookingbyCode)
			api.GET("notapprove/booking/code/:code", controller.GetBookingbyCodeThatNotApprove)
			api.GET("notapprove/bookings", controller.ListBookingsThatNotApprove)
			api.GET("approve/booking/code/:code", controller.GetBookingbyCodeThatApprove)
			api.GET("/bookings/user/:id", controller.ListBookingsByUser)

			// Room Routes
			api.POST("/room", controller.CreateRoom)
			api.GET("/rooms/building/:id", controller.ListRoomsbyBuilding)
			api.GET("/rooms", controller.ListRooms)
			api.GET("/room/:id", controller.GetRoom)
			api.PUT("/room", controller.UpdateRoom)
			api.GET("/typerooms", controller.ListTyperooms)
			api.DELETE("/room/:id", controller.DeleteRoom)

			// Building Routes
			api.POST("/building", controller.CreateBuilding)
			api.GET("/buildings", controller.ListBuildings)
			api.GET("/building/:id", controller.GetBuilding)
			api.PUT("/building", controller.UpdateBuilding)
			api.DELETE("/building/:id", controller.DeleteBuilding)

			// Objective Routes
			api.GET("/objectives", controller.ListObjectives)
			api.GET("/objective/:id", controller.GetObjective)

			// User Routes
			// api.POST("/user", controller.CreateUser)
			api.GET("/users", controller.ListUsers)
			api.GET("/user/:id", controller.GetUser)
			api.GET("/User/StudentID/:StudentID", controller.GetUserByStudentID)
			api.GET("/educationlevels", controller.ListEducationLevels)
			api.GET("/genders", controller.ListGenders)
			api.GET("/roles", controller.ListRoles)
			api.DELETE("/user/:id", controller.DeleteUser)
			api.PATCH("/user", controller.UpdateUser)

			// Appprove Routes
			api.GET("/approves", controller.ListApproves)
			api.GET("/approve/:id", controller.GetApprove)
			api.POST("/approve", controller.CreateApprove)
			api.PUT("/approve", controller.UpdateApprove)
			api.DELETE("/approve/:id", controller.DeleteApprove)
			// api.POST("/approveCode", controller.GetApproveByCode)

			// Status Book
			api.GET("/statusBooks", controller.ListStatusBooks)
			api.GET("/statusBook/:id", controller.GetStatusBook)

			// Add Friend Routes
			api.GET("/add_friends", controller.ListAdd_friend)
			api.GET("/add_friend/:id", controller.GetAdd_friend)
			api.POST("/add_friend", controller.CreateAdding_Friend)
			api.PATCH("/add_friend", controller.UpdateAddfriend)
			api.DELETE("/add_friends/:id", controller.DeleteAdd_friend)

			// Order food Routes
			api.GET("/order_foods", controller.ListOrder_food)
			api.GET("/order_food/:id", controller.GetOrder_food)
			api.GET("/order_foods/Booking/code/:code", controller.ListOrderByBookingCode)
			api.POST("/order_food", controller.CreateOrder_food)
			api.PUT("/order_food", controller.UpdateOrder_food)
			api.DELETE("/order_food/:id", controller.DeleteOrder_food)

			// Borrow
			api.POST("/borrow", controller.CreateBorrow)
			api.GET("/borrow/:id", controller.GetBorrow)
			api.GET("/borrows", controller.ListBorrows)
			api.DELETE("/borrow/:id", controller.DeleteBorrow)
			api.PATCH("/borrow/:id", controller.UpdateBorrow)

			// Payback
			api.POST("/paybacks", controller.CreatePayback)
			api.GET("/payback/:id", controller.GetPayback)
			api.GET("/paybacks", controller.ListPaybacks)
			api.DELETE("/payback", controller.DeletePayback)
			api.PATCH("/payback/:id", controller.UpdatePayback)

			// Device
			api.POST("/device", controller.CreateDevice)
			api.GET("/device/:id", controller.GetDevice)
			api.GET("/devices", controller.ListDevices)
			api.DELETE("/device/:id", controller.DeleteDevice)
			api.PUT("/device", controller.UpdateDevice)

			api.GET("/brands", controller.ListBrands)

			//DeviceType use by borrow
			api.GET("/device_types", controller.ListDeviceType)
			api.GET("/devices/device_type/:id", controller.ListTypebyDevice)
			// api.GET("/devices",controller.ListStatus_Device)

			// Guard
			api.GET("/guards", controller.ListGuards)

			// Company
			api.GET("/companies", controller.ListCompanies)

			// Food_and_Drink
			api.POST("/food_and_drink", controller.CreateFood_and_Drink)
			api.GET("/food_and_drink/:id", controller.GetFood_and_Drink)
			api.GET("/food_and_drinks", controller.ListFood_and_Drinks)
			api.GET("/shops", controller.ListShops)
			api.GET("/foodtypes", controller.ListFoodtypes)
			api.DELETE("/food_and_drink/:id", controller.DeleteFood_and_Drink)
			api.PATCH("/food_and_drink", controller.UpdateFood_and_Drink)
		}
	}
	// Create User For Login
	r.POST("/user", controller.CreateUser)

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
