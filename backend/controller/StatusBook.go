package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/sut65/team14/entity"
)

// POST /statusBooks
func CreateStatusBook(c *gin.Context) {
	var statusBook entity.StatusBook
	if err := c.ShouldBindJSON(&statusBook); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&statusBook).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": statusBook})
}

// GET /statusBook/:id
func GetStatusBook(c *gin.Context) {
	var statusBook entity.StatusBook
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&statusBook); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "statusBook not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": statusBook})
}

// GET /statusBooks
func ListStatusBooks(c *gin.Context) {
	var statusBooks []entity.StatusBook
	if err := entity.DB().Raw("SELECT * FROM status_Books").Find(&statusBooks).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": statusBooks})
}

// DELETE /statusBooks/:id
func DeleteStatusBook(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM status_Books WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "statusBook not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /statusBooks
func UpdateStatusBook(c *gin.Context) {
	var statusBook entity.StatusBook
	if err := c.ShouldBindJSON(&statusBook); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", statusBook.ID).First(&statusBook); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "statusBook not found"})
		return
	}
	if err := entity.DB().Save(&statusBook).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": statusBook})
}
