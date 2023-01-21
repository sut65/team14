package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team14/entity"
)

// POST Adding Friend
func CreateAdding_Friend(c *gin.Context) {
	var add_friend entity.Adding_Friend
	var approve entity.Approve
	var user entity.User
	var admin entity.User

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ x จะถูก bind เข้าตัวแปร add_friend
	if err := c.ShouldBindJSON(&add_friend); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา Amin ด้วย id
	if tx := entity.DB().Where("id = ?", add_friend.AdminID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	// ค้นหา Approve ด้วย id
	if tx := entity.DB().Where("id = ?", add_friend.ApproveID).First(&approve); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "approve ID not found"})
		return
	}

	// ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", add_friend.UserID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "approve ID not found"})
		return
	}

	//สร้าง Adding Friend
	bod := entity.Adding_Friend{
		Approve: approve,
		User:    admin,
		Admin:   user,
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

// GET /adding_friend/:id
func GetAdd_friend(c *gin.Context) {
	var add_friend entity.Adding_Friend
	id := c.Param("id")
	if err := entity.DB().Preload("User").Preload("User").Preload("Approve").Raw("SELECT * FROM add_friend WHERE id = ?", id).Find(&add_friend).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": add_friend})
}

// GET /add_friends
func ListAdd_friend(c *gin.Context) {
	var add_friends []entity.Adding_Friend
	if err := entity.DB().Preload("User").Preload("User").Preload("Approve").Raw("SELECT * FROM add_friends").Find(&add_friends).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": add_friends})
}

// function สำหรับลบ เพื่อน ด้วย ID
// DELETE /add_friends/:id
func DeleteAdd_friend(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM add_friendss WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Adding friend not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /add_friends
func UpdateAddfriend(c *gin.Context) {
	var add_friend entity.Adding_Friend
	if err := c.ShouldBindJSON(&add_friend); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", add_friend.ID).First(&add_friend); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Booking not found"})
		return
	}

	if err := entity.DB().Save(&add_friend).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": add_friend})
}
