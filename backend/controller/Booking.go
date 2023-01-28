package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"

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

	// ถ้าเจอ   ก็คือ การจองห้องเวลาชนกัน ไปเช็คว่าการจองนั้นได้รับอนุมัติไหม
	// ถ้าไม่เจอ ไม่เข้า if-else
	var checkDate entity.Booking
	if err := entity.DB().
		Raw("select b.* from "+
			"rooms r inner join bookings b on r.id = b.room_id "+
			"where not(datetime(b.date_start) > ? "+ /*END*/
			"or datetime(b.date_end) < ?)  "+ /*Start*/
			"ORDER BY id DESC LIMIT 1 ", booking.Date_End, booking.Date_Start).
		Scan(&checkDate).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if !(checkDate.ID == '0' || checkDate.ID == 0) {
		// เอา booking ที่เจอไปค้นหา
		// ถ้าเจอ   การจองนั้น *ไม่ได้* รับอนุมัติ **ไม่เข้า if-else**
		// ถ้าไม่เจอ ก็คือ table booking ยังไม่มีการจองเกิดขึ้น *หรือ* การจองนั้นได้รับอนุมัติไปแล้ว *หรือ* การจองนั้นรอการได้รับการอนุมัติ
		var checkApprove entity.Booking
		if err := entity.DB().
			Raw("select b.* from "+
				"rooms r inner join bookings b on r.id = b.room_id "+
				"inner join approves a on a.booking_id = b.id and a.status_book_id = 2 "+ //ได้รับการอนุมัติแล้ว
				"where not(datetime(b.date_start) > ? "+ /*END*/
				"or datetime(b.date_end) < ?) and b.id = ? "+ /*Start*/
				"ORDER BY id DESC LIMIT 1;", checkDate.Date_End, checkDate.Date_Start, checkDate.ID).
			Scan(&checkApprove).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		if checkApprove.ID == '0' || checkApprove.ID == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "หมายเลขห้องนี้ถูกจองใช้ห้องไปแล้ว"})
			return
		}
	}

	//สร้าง Booking
	bod := entity.Booking{
		Code:       booking.Code,
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

// GET /booking/code/:code
func GetBookingbyCode(c *gin.Context) {
	var Booking entity.Booking
	code := c.Param("code")
	if err := entity.DB().Preload("User").Preload("Objective").Preload("Room").Preload("Room.Building").Preload("Approve").Raw("SELECT * FROM bookings WHERE code = ?", code).Find(&Booking).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Booking})
}

// GET approve/booking/code/:code
func GetBookingbyCodeThatApprove(c *gin.Context) {
	var Booking entity.Booking
	code := c.Param("code")
	if err := entity.DB().Preload("User").Preload("Room").Preload("Room.Building").Preload("Approve").
		Raw("select b.* from bookings b inner join approves a on a.booking_id = b.id where a.status_book_id=1 and b.code = ?", code).
		Find(&Booking).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Booking})
}

// GET /bookings/user/:id
func ListBookingsByUser(c *gin.Context) {
	var Booking []entity.Booking
	id := c.Param("id")
	if err := entity.DB().Preload("User").Preload("Objective").Preload("Room").Preload("Approve").Raw("SELECT * FROM bookings WHERE user_id = ?", id).Find(&Booking).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Booking})
}

// GET notapprove/booking/code/:code
func GetBookingbyCodeThatNotApprove(c *gin.Context) {
	var Booking entity.Booking
	code := c.Param("code")
	if err := entity.DB().Preload("User").Preload("Objective").Preload("Room").Preload("Room.Building").
		Raw("SELECT * FROM bookings where code = ? and id not in ( Select b1.id as id from bookings b1 inner JOIN approves a1 on a1.booking_id = b1.id );", code).
		Find(&Booking).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if Booking.ID == '0' || Booking.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "รหัสการจองนี้ อาจจะถูกอนุมัติไปแล้ว หรือไม่ก็ ไม่พบรหัสการจองนี้"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Booking})
}

// GET notapprove/bookings
func ListBookingsThatNotApprove(c *gin.Context) {
	var Booking entity.Booking
	if err := entity.DB().Preload("User").Preload("Objective").Preload("Room").Preload("Room.Building").
		Raw("SELECT * FROM bookings where id not in ( Select b1.id as id from bookings b1 inner JOIN approves a1 on a1.booking_id = b1.id );").
		Find(&Booking).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if Booking.ID == '0' || Booking.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "รหัสการจองนี้ อาจจะถูกอนุมัติไปแล้ว หรือไม่ก็ ไม่พบรหัสการจองนี้"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Booking})
}

// GET /bookings
func ListBookings(c *gin.Context) {
	var Bookings []entity.Booking
	if err := entity.DB().Preload("User").Preload("Objective").Preload("Room").Preload("Approve").Preload("Approve.StatusBook").
		Raw("SELECT * FROM bookings").Find(&Bookings).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Bookings})
}

// GET /bookings/room/:id
func ListBookingsbyRoom(c *gin.Context) {
	var bookings []entity.Booking
	detail := c.Param("id")
	if detail != "0" {
		// เอาแค่ การจองที่ *รอการได้รับอนุมัติ* และ *ได้รับอนุมัติ* แล้ว เท่านั้น!!
		if err := entity.DB().Preload("User").Preload("Objective").Preload("Room").Preload("Approve").Preload("Approve.StatusBook").
			Raw("select b.* from "+
				"rooms r inner join bookings b on r.id = b.room_id "+
				"and datetime(date_end) > datetime('now', 'localtime') "+
				"and r.Detail = ? "+
				"EXCEPT "+
				"select b.* from "+
				"rooms r inner join bookings b on r.id = b.room_id "+
				"inner join approves a on a.booking_id = b.id  and a.status_book_id = 2;", detail).Find(&bookings).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
	}
	if detail == "0" {
		if err := entity.DB().Preload("User").Preload("Objective").Preload("Room").Preload("Approve").Preload("Approve.StatusBook").
			Raw("select b.* from " +
				"rooms r inner join bookings b on r.id = b.room_id " +
				"and datetime(date_end) > datetime('now', 'localtime') " +
				"EXCEPT " +
				"select b.* from " +
				"rooms r inner join bookings b on r.id = b.room_id " +
				"inner join approves a on a.booking_id = b.id  and a.status_book_id = 2;").
			Find(&bookings).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
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
