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
	// var devicetype entity.DeviceType
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

	// // ค้นหา devicetype ด้วย id
	// if tx := entity.DB().Where("id = ?", borrow.DeviceTypeID).First(&devicetype); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบประเภทอุปกรณ์"})
	// 	return
	// }

	// ค้นหา Approve ด้วย id
	if tx := entity.DB().Where("id = ?", borrow.ApproveID).First(&approve); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบการจองนี้"})
		return
	}

	//สร้าง borrow
	bod := entity.Borrow{
		Timeofborrow: borrow.Timeofborrow,

		BorrowNote1:  borrow.BorrowNote1,
		BorrowAPNote: borrow.BorrowAPNote,

		Admin:   admin,
		Device:  device,
		Approve: approve,
		// DeviceType: devicetype,
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
	if err := entity.DB().Preload("Admin").Preload("Device").Preload("Approve").
		Raw("select * from borrows where "+
			"id not in ( select borrow_id from paybacks where deleted_at is null and id = ?) "+
			"and id = ? ", id, id).
		Find(&Borrow).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if Borrow.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "อุปกรณ์นี้ถูกคืนแล้ว"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Borrow})
}

// GET /Borrows
func ListBorrows(c *gin.Context) {
	var Borrows []entity.Borrow
	if err := entity.DB().Preload("Admin").Preload("Device").Preload("Approve").
		Raw("select * from borrows where id not in ( select borrow_id from paybacks where deleted_at is null)").
		Find(&Borrows).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Borrows})
}

// DELETE /Borrows/:id
func DeleteBorrow(c *gin.Context) {
	id := c.Param("id")
	var Payback entity.Payback
	if err := entity.DB().Raw("SELECT * FROM paybacks WHERE borrow_id = ? ", id).Find(&Payback).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if Payback.ID != 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "อุปกรณ์นี้ถูกคืนแล้ว"})
		return
	}
	if tx := entity.DB().Exec("DELETE FROM borrows WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "borrows not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /Borrows
func UpdateBorrow(c *gin.Context) {
	var Borrow entity.Borrow
	var tmp entity.Borrow

	if err := c.ShouldBindJSON(&Borrow); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา Borrow ด้วย ID
	if tx := entity.DB().Where("id = ?", Borrow.ID).First(&tmp); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Borrow not found"})
		return
	}

	// var BorrowNote1 entity.Borrow
	// var BorrowAPNote entity.Borrow

	var Admin entity.User
	var Device entity.Device
	var DeviceType entity.DeviceType

	// ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", Borrow.Admin).First(&Admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	// ค้นหา devicetype ด้วย id
	if tx := entity.DB().Where("id = ?", Borrow.Device.DeviceTypeID).First(&DeviceType); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Booking not found"})
		return
	}

	// ค้นหา device ด้วย id
	if tx := entity.DB().Where("id = ?", Borrow.DeviceID).First(&Device); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Device not found"})
		return
	}


	tmp.Device = Device
	tmp.Device.DeviceTypeID = Device.DeviceTypeID
	tmp.Admin = Admin
	tmp.BorrowAPNote = Borrow.BorrowAPNote
	tmp.BorrowNote1 = Borrow.BorrowNote1

	if err := entity.DB().Save(&tmp).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": tmp})
	
	// if err := entity.DB().Save(&Borrow).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	// c.JSON(http.StatusOK, gin.H{"data": Borrow})
}
