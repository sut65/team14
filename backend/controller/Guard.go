package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/sut65/team14/entity"
)

// POST /guards
func CreateGuard(c *gin.Context) {
	var guard entity.Guard
	if err := c.ShouldBindJSON(&guard); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&guard).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": guard})
}

// GET /guard/:id
func GetGuard(c *gin.Context) {
	var guard entity.Guard
	id := c.Param("id")
	// if err := entity.DB().Raw("SELECT * FROM guards WHERE id = ?", id).Scan(&guard).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	if tx := entity.DB().Where("id = ?", id).First(&guard); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "guard not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": guard})
}

// GET /guards
func ListGuards(c *gin.Context) {
	var guards []entity.Guard
	if err := entity.DB().Raw("SELECT * FROM guards").Find(&guards).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": guards})
}

// DELETE /guards/:id
func DeleteGuard(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM guards WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "guard not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /guards
func UpdateGuard(c *gin.Context) {
	var guard entity.Guard
	if err := c.ShouldBindJSON(&guard); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", guard.ID).First(&guard); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "guard not found"})
		return
	}
	if err := entity.DB().Save(&guard).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": guard})
}
