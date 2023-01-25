package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team14/entity"
)

// POST /Borrow
func CreateBorrow(c *gin.Context) {

	var borrow entity.Borrow
	var device entity.Device
	var approve entity.Approve
	var admin entity.User
	// ผลลัพธ์ที่ได้จากขั้นตอนที่ x จะถูก bind เข้าตัวแปร borrow
	if err := c.ShouldBindJSON(&borrow); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา admin ด้วย id
	if tx := entity.DB().Where("id = ?", borrow.AdminID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบสมาชิก"})
		return
	}

	// ค้นหา device ด้วย id
	if tx := entity.DB().Where("id = ?", borrow.DeviceID).First(&device); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบอุปกรณ์"})
		return
	}

	// ค้นหา Approve ด้วย id
	if tx := entity.DB().Where("id = ?", borrow.ApproveID).First(&approve); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบการจองนี้"})
		return
	}

	//สร้าง borrow
	bod := entity.Borrow{
		Admin:   admin,
		Device:  device,
		Approve: approve,
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

// GET /Borrow/:id
func GetBorrow(c *gin.Context) {
	var Borrow entity.Borrow
	id := c.Param("id")
	if err := entity.DB().Preload("Admin").Preload("Device").Preload("Approve").Raw("SELECT * FROM borrows WHERE id = ?", id).Find(&Borrow).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Borrow})
}

// GET /Borrows
func ListBorrows(c *gin.Context) {
	var Borrows []entity.Borrow
	if err := entity.DB().Preload("Admin").Preload("Device").Preload("Approve").Raw("SELECT * FROM borrows").Find(&Borrows).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Borrows})
}

// DELETE /Borrows/:id
func DeleteBorrow(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM borrows WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Borrow not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /Borrows
func UpdateBorrow(c *gin.Context) {
	var Borrow entity.Borrow
	if err := c.ShouldBindJSON(&Borrow); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", Borrow.ID).First(&Borrow); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Borrow not found"})
		return
	}

	if err := entity.DB().Save(&Borrow).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Borrow})
}
