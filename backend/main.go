package main

import (
	"github.com/sut65/team14/controller"

	"github.com/sut65/team14/entity"

	"github.com/gin-gonic/gin"
)

func main() {

	entity.SetupDatabase()

	r := gin.Default()

	// Booking Routes
	r.GET("/bookings", controller.ListBookings)
	r.GET("/booking/:id", controller.GetBooking)
	r.POST("/booking", controller.CreateBooking)
	r.PATCH("/booking", controller.UpdateBooking)
	r.DELETE("/booking/:id", controller.DeleteBooking)

	// Run the server

	r.Run()

}
