package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/sut65/team14/entity"
)

// POST /typerooms
func CreateTyperoom(c *gin.Context) {
	var typeroom entity.Typeroom
	if err := c.ShouldBindJSON(&typeroom); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&typeroom).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": typeroom})
}

// GET /typeroom/:id
func GetTyperoom(c *gin.Context) {
	var typeroom entity.Typeroom
	id := c.Param("id")
	// if err := entity.DB().Raw("SELECT * FROM typerooms WHERE id = ?", id).Scan(&typeroom).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	if tx := entity.DB().Where("id = ?", id).First(&typeroom); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "typeroom not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": typeroom})
}

// GET /typerooms
func ListTyperooms(c *gin.Context) {
	var typerooms []entity.Typeroom
	if err := entity.DB().Raw("SELECT * FROM typerooms").Find(&typerooms).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": typerooms})
}

// DELETE /typerooms/:id
func DeleteTyperoom(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM typerooms WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "typeroom not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /typerooms
func UpdateTyperoom(c *gin.Context) {
	var typeroom entity.Typeroom
	if err := c.ShouldBindJSON(&typeroom); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", typeroom.ID).First(&typeroom); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "typeroom not found"})
		return
	}
	if err := entity.DB().Save(&typeroom).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": typeroom})
}
