package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"

	"github.com/sut65/team14/entity"
)

// POST /devices
func CreateDevice(c *gin.Context) {
	var device entity.Device
	//var guard entity.Guard
	var devicetype entity.DeviceType
	var brand entity.Brand

	if err := c.ShouldBindJSON(&device); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", device.BrandID).First(&brand); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบสมาชิก"})
		return
	}
	if tx := entity.DB().Where("id = ?", device.DeviceTypeID).First(&devicetype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบบริษัท]"})
		return
	}
	// if tx := entity.DB().Where("id = ?", device.GuardID).First(&guard); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบผู้รักษาความปลอดภัย"})
	// 	return
	// }

	bod := entity.Device{
		Brand:   brand,
		DeviceType: devicetype,
		//Guard:   guard,
		Detail: device.Detail,
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
	c.JSON(http.StatusOK, gin.H{"data": device})

	if _, err := govalidator.ValidateStruct(device); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

}

// GET /device/:id
// func GetDevice(c *gin.Context) {
// 	var device entity.Device
// 	id := c.Param("id")
// 	// if err := entity.DB().Raw("SELECT * FROM devices WHERE id = ?", id).Scan(&device).Error; err != nil {
// 	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 	// 	return
// 	// }

// 	if tx := entity.DB().Where("id = ?", id).First(&device); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "device not found"})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": device})
// }

// GET /devices
func ListDevices(c *gin.Context) {
	var devices []entity.Device
	if err := entity.DB().Raw("SELECT * FROM devices").Find(&devices).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": devices})
}

func ListDeviceType(c *gin.Context) {
	var DeviceType []entity.DeviceType

	if err := entity.DB().Raw("SELECT * FROM device_types").Find(&DeviceType).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": DeviceType})
}

func ListTypebyDevice(c *gin.Context) {
	var device_id []entity.Device
	devicetype := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM devices WHERE (device_type_id = ?) AND (status_device = 1)", devicetype).Find(&device_id).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": device_id})
}

func ListBrandbyDevice(c *gin.Context) {
	var brand_id []entity.Device
	brand := c.Param("id")
	if err := entity.DB().Preload("Brand").Raw("SELECT * FROM devices WHERE brand_id = ?", brand).Find(&brand_id).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": brand_id})
}

// DELETE /devices/:id
func DeleteDevice(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM devices WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "device not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /devices
func UpdateDevice(c *gin.Context) {
	var device entity.Device
	if err := c.ShouldBindJSON(&device); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", device.ID).First(&device); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "device not found"})
		return
	}
	if err := entity.DB().Save(&device).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": device})
}

// GET /Device
func GetDevice(c *gin.Context) {
	var device entity.Device
	id := c.Param("id")
	if err := entity.DB().Preload("Brand").Preload("DeviceType").Raw("SELECT * FROM devices WHERE id = ?", id).Find(&device).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": device})
}