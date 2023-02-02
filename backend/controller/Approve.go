package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/asaskevich/govalidator"
	"github.com/sut65/team14/entity"
)

// POST /approve
func CreateApprove(c *gin.Context) {

	var approve entity.Approve
	var user entity.User
	var statusBook entity.StatusBook
	var Booking entity.Booking

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ x จะถูก bind เข้าตัวแปร Approve
	if err := c.ShouldBindJSON(&approve); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", approve.UserID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	// ค้นหา statusBook ด้วย id
	if tx := entity.DB().Where("id = ?", approve.StatusBookID).First(&statusBook); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "StatusBook not found"})
		return
	}

	// ค้นหา booking ด้วย id
	if tx := entity.DB().Where("id = ?", approve.BookingID).First(&Booking); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Booking not found"})
		return
	}

	//สร้าง Approve
	bod := entity.Approve{

		Code:        approve.Code,
		Note:        approve.Note,
		ApproveTime: approve.ApproveTime,

		User:       user,
		StatusBook: statusBook,
		Booking:    Booking,
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

// GET /approve/:id
func GetApprove(c *gin.Context) {
	var Approve entity.Approve
	id := c.Param("id")
	if err := entity.DB().Preload("User").Preload("StatusBook").Preload("Booking").Preload("Booking.User").Raw("SELECT * FROM approves WHERE id = ?", id).Find(&Approve).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Approve})
}

// GET /approve
func ListApproves(c *gin.Context) {
	var Approves []entity.Approve
	if err := entity.DB().Preload("User").Preload("StatusBook").Preload("Booking").Raw("SELECT * FROM approves").Find(&Approves).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Approves})
}

// DELETE /approve/:id
func DeleteApprove(c *gin.Context) {
	var Approve entity.Approve
	id := c.Param("id")
	// UPDATE Approves SET deleted_at="now" WHERE id = ?;
	if tx := entity.DB().Where("id = ?", id).Delete(&Approve); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Approve not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PUT /approve
func UpdateApprove(c *gin.Context) {
	var approve entity.Approve
	// var tmp entity.Approve

	if err := c.ShouldBindJSON(&approve); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา Approve ด้วย ID
	if tx := entity.DB().Where("id = ?", approve.ID).First(&approve); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Approve not found"})
		return
	}

	var user entity.User
	var statusBook entity.StatusBook
	var Booking entity.Booking

	// ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", approve.UserID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	// ค้นหา statusBook ด้วย id
	if tx := entity.DB().Where("id = ?", approve.StatusBookID).First(&statusBook); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "StatusBook not found"})
		return
	}

	// ค้นหา booking ด้วย id
	if tx := entity.DB().Where("id = ?", approve.BookingID).First(&Booking); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Booking not found"})
		return
	}

	// approve.Booking = Booking
	// approve.StatusBook = statusBook
	// approve.User = user

	if err := entity.DB().Save(&approve).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": approve})
}
