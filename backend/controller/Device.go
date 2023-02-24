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
	var devicetype entity.DeviceType
	var brand entity.Brand
	var admin entity.User

	if err := c.ShouldBindJSON(&device); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", device.AdminID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบสมาชิก"})
		return
	}
	if tx := entity.DB().Where("id = ?", device.BrandID).First(&brand); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบยี่ห้อ"})
		return
	}
	if tx := entity.DB().Where("id = ?", device.DeviceTypeID).First(&devicetype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบประเภท"})
		return
	}
	// if tx := entity.DB().Where("id = ?", device.GuardID).First(&guard); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบผู้รักษาความปลอดภัย"})
	// 	return
	// }

	bod := entity.Device{
		Detail: device.Detail,
		Number: device.Number,
		Note: device.Note,
		Brand:      brand,
		DeviceType: devicetype,
		Admin: admin,
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
func ListDevice(c *gin.Context) {
	var device []entity.Device
	if err := entity.DB().Preload("DeviceType").Preload("Brand").Preload("Admin").Raw("SELECT * FROM device").Find(&device).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": device})
}

func ListDevices(c *gin.Context) {
	var devices []entity.Device
	if err := entity.DB().Preload("DeviceType").Preload("Brand").Preload("Admin").Raw("SELECT * FROM devices").Find(&devices).Error; err != nil {
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
//list devicewhere status = true
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

// PUT /devices
func UpdateDevice(c *gin.Context) {
	var device entity.Device
	var tmp entity.Device
	if err := c.ShouldBindJSON(&device); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", device.ID).First(&tmp); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "device not found"})
		return
	}

	var devicetype entity.DeviceType
	var brand entity.Brand

	if tx := entity.DB().Where("id = ?", device.BrandID).First(&brand); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบสมาชิก"})
		return
	}
	if tx := entity.DB().Where("id = ?", device.DeviceTypeID).First(&devicetype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบบริษัท]"})
		return
	}

	tmp.Brand = brand
	tmp.DeviceType = devicetype

	tmp.StatusDevice = device.StatusDevice

	// ขั้นตอนการ validate
	if _, err := govalidator.ValidateStruct(tmp); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// update
	if err := entity.DB().Save(&tmp).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": tmp})
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

// Update /Devicestats
