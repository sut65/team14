package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"

	"github.com/sut65/team14/entity"
)

// POST /rooms
func CreateRoom(c *gin.Context) {
	var room entity.Room
	var admin entity.User
	var typeroom entity.Typeroom
	var building entity.Building

	if err := c.ShouldBindJSON(&room); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", room.AdminID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบสมาชิก"})
		return
	}
	if tx := entity.DB().Where("id = ?", room.TyperoomID).First(&typeroom); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบประเภทห้อง"})
		return
	}
	if tx := entity.DB().Where("id = ?", room.BuildingID).First(&building); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบตึก"})
		return
	}
	bod := entity.Room{
		Admin:    admin,
		Typeroom: typeroom,
		Building: building,
		Detail:   room.Detail,
		Note:     room.Note,
		Time:     room.Time,
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
	c.JSON(http.StatusOK, gin.H{"data": room})
}

// GET /room/:id
func GetRoom(c *gin.Context) {
	var room entity.Room
	id := c.Param("id")
	if err := entity.DB().Preload("Admin").Preload("Typeroom").Preload("Building").Raw("SELECT * FROM rooms WHERE id = ?", id).Find(&room).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": room})
}

// GET /rooms/building/:id
func ListRoomsbyBuilding(c *gin.Context) {
	var room []entity.Room
	building_id := c.Param("id")
	if err := entity.DB().Preload("Building").Raw("SELECT * FROM rooms WHERE building_id = ?", building_id).Find(&room).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": room})
}

// GET /rooms
func ListRooms(c *gin.Context) {
	var room []entity.Room
	if err := entity.DB().Preload("Admin").Preload("Typeroom").Preload("Building").Raw("SELECT * FROM rooms where deleted_at is null").Find(&room).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": room})
}

// DELETE /rooms/:id
func DeleteRoom(c *gin.Context) {
	var Room entity.Room
	id := c.Param("id")
	// UPDATE booking SET deleted_at="now" WHERE id = ?;
	if tx := entity.DB().Where("id = ?", id).Delete(&Room); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Room not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /rooms
func UpdateRoom(c *gin.Context) {
	var room entity.Room
	if err := c.ShouldBindJSON(&room); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var tmp entity.Room
	var admin entity.User
	var typeroom entity.Typeroom
	var building entity.Building

	if tx := entity.DB().Where("id = ?", room.ID).First(&tmp); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบสมาชิก"})
		return
	}
	if tx := entity.DB().Where("id = ?", room.AdminID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบสมาชิก"})
		return
	}
	if tx := entity.DB().Where("id = ?", room.TyperoomID).First(&typeroom); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบประเภทห้อง"})
		return
	}
	if tx := entity.DB().Where("id = ?", room.BuildingID).First(&building); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบตึก"})
		return
	}

	tmp.Admin = admin
	tmp.Typeroom = typeroom
	tmp.Building = building
	tmp.Detail = room.Detail
	tmp.Note = room.Note

	if err := entity.DB().Save(&room).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": room})
}
