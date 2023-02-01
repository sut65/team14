package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/sut65/team14/entity"
)

// POST /devicetypes
func CreateDeviceType(c *gin.Context) {
	var devicetype entity.DeviceType
	if err := c.ShouldBindJSON(&devicetype); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&devicetype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": devicetype})
}

// GET /devicetype/:id
func GetDeviceType(c *gin.Context) {
	var devicetype entity.DeviceType
	id := c.Param("id")
	// if err := entity.DB().Raw("SELECT * FROM companies WHERE id = ?", id).Scan(&company).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	if tx := entity.DB().Where("id = ?", id).First(&devicetype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "devicetype not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": devicetype})
}

// GET /devicetypes
func ListDeviceTypes(c *gin.Context) {
	var devicetypes []entity.DeviceType
	if err := entity.DB().Raw("SELECT * FROM devicetypes").Find(&devicetypes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": devicetypes})
}

// DELETE /devicetypes/:id
func DeleteDeviceType(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM devicetypes WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "devicetype not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /companies
func UpdateDeviceType(c *gin.Context) {
	var devicetype entity.DeviceType
	if err := c.ShouldBindJSON(&devicetype); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", devicetype.ID).First(&devicetype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "devicetype not found"})
		return
	}
	if err := entity.DB().Save(&devicetype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": devicetype})
}
