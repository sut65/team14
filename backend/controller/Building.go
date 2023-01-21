package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team14/entity"
)

// POST /buildings
func CreateBuilding(c *gin.Context) {
	var building entity.Building
	if err := c.ShouldBindJSON(&building); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&building).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": building})
}

// GET /Building
func GetBuilding(c *gin.Context) {
	var building entity.Building
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM buildings WHERE id = ?", id).Scan(&building).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": building})
}

// GET /Buildings
func ListBuildings(c *gin.Context) {
	var buildings []entity.Building
	if err := entity.DB().Raw("SELECT * FROM buildings").Scan(&buildings).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": buildings})
}

// DELETE /buildings/:id
func DeleteBuilding(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM buildings WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "building not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /buildings
func UpdateBuilding(c *gin.Context) {
	var building entity.Building
	if err := c.ShouldBindJSON(&building); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", building.ID).First(&building); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "building not found"})
		return
	}
	if err := entity.DB().Save(&building).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": building})
}
