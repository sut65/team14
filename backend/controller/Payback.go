package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team14/entity"
)

// POST /Payback
func CreatePayback(c *gin.Context) {
	
	var payback entity.Payback
	var borrow entity.Borrow
	var device entity.Device
	var admin entity.User

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ x จะถูก bind เข้าตัวแปร Payback
	if err := c.ShouldBindJSON(&borrow); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา admin ด้วย id
	if tx := entity.DB().Where("id = ?", payback.AdminID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบสมาชิก"})
		return
	}

	// ค้นหา device ด้วย id
	if tx := entity.DB().Where("id = ?", payback.DeviceID).First(&device); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบอุปกรณ์"})
		return
	}

	// ค้นหา Borrow ด้วย id
	if tx := entity.DB().Where("id = ?", payback.BorrowID).First(&borrow); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบการจองนี้"})
		return
	}

	//สร้าง Payback
	bod := entity.Payback{
		Admin:   admin,
		Device:  device,
		Borrow: borrow,
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




// GET /Payback/:id
func GetPayback(c *gin.Context) {
	var Payback entity.Payback
	id := c.Param("id")
	if err := entity.DB().Preload("User").Preload("Device").Preload("Borrow").Raw("SELECT * FROM paybacks WHERE id = ?", id).Find(&Payback).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Payback})
}




// GET /Paybacks
func ListPaybacks(c *gin.Context) {
	var Paybacks []entity.Payback
	if err := entity.DB().Preload("User").Preload("Device").Preload("Borrow").Raw("SELECT * FROM paybacks").Find(&Paybacks).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Paybacks})
}



// DELETE /Paybacks/:id
func DeletePayback(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM paybacks WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Payback not found"})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{"data": id})
}




// PATCH /Paybacks
func UpdatePayback(c *gin.Context) {
	var Payback entity.Borrow
	if err := c.ShouldBindJSON(&Payback); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", Payback.ID).First(&Payback); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Payback not found"})
		return
	}

	if err := entity.DB().Save(&Payback).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Payback})
}
