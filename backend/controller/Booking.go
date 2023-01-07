package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/asaskevich/govalidator"
	"github.com/sut65/team14/entity"
)

// POST /booking
func CreateBooking(c *gin.Context) {

	var booking entity.Booking
	var user entity.User
	var objective entity.Objective
	var Room entity.Room

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ x จะถูก bind เข้าตัวแปร Booking
	if err := c.ShouldBindJSON(&booking); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", booking.UserID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบสมาชิก"})
		return
	}

	// ค้นหา objective ด้วย id
	if tx := entity.DB().Where("id = ?", booking.ObjectiveID).First(&objective); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบรายละเอียดการจอง"})
		return
	}

	// ค้นหา room ด้วย id
	if tx := entity.DB().Where("id = ?", booking.RoomID).First(&Room); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบห้อง"})
		return
	}

	//สร้าง Booking
	bod := entity.Booking{
		Date_Start: booking.Date_Start,
		Date_End:   booking.Date_End,

		User:      user,
		Objective: objective,
		Room:      Room,
	}

	// ขั้นตอนการ validate
	if _, err := govalidator.ValidateStruct(bod); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// บันทึก
	if err := entity.DB().Create(&bod).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bod})
}

// GET /booking/:id
func GetBooking(c *gin.Context) {
	var Booking entity.Booking
	id := c.Param("id")
	if err := entity.DB().Preload("User").Preload("Objective").Preload("Room").Preload("Approve").Raw("SELECT * FROM bookings WHERE id = ?", id).Find(&Booking).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Booking})
}

// GET /bookings
func ListBookings(c *gin.Context) {
	var Bookings []entity.Booking
	if err := entity.DB().Preload("User").Preload("Objective").Preload("Room").Preload("Approve").Raw("SELECT * FROM bookings").Find(&Bookings).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Bookings})
}

// GET /bookings/room/:id
func ListBookingsbyRoom(c *gin.Context) {
	var bookings []entity.Booking
	room_id := c.Param("id")
	if err := entity.DB().Preload("User").Preload("Objective").Preload("Room").Preload("Approve").Raw("SELECT * FROM bookings WHERE room_id = ?", room_id).Find(&bookings).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bookings})
}

// function สำหรับลบ customer ด้วย ID
// DELETE /bookings/:id
func DeleteBooking(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM bookings WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Booking not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /bookings
func UpdateBooking(c *gin.Context) {
	var Booking entity.Booking
	if err := c.ShouldBindJSON(&Booking); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", Booking.ID).First(&Booking); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Booking not found"})
		return
	}

	if err := entity.DB().Save(&Booking).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Booking})
}
