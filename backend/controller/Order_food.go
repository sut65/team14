package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team14/entity"
)

// POST Order food
func CreateOrder_food(c *gin.Context) {
	var order_food entity.Order_Food
	
	var approve entity.Approve
	var food_and_drink entity.Food_and_Drink
	var admin entity.User	

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ x จะถูก bind เข้าตัวแปร order food
	if err := c.ShouldBindJSON(&order_food); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา Amin ด้วย id
	if tx := entity.DB().Where("id = ?", order_food.AdminID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	// ค้นหา Approve ด้วย id
	if tx := entity.DB().Where("id = ?", order_food.ApproveID).First(&approve); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Approve ID not found"})
		return
	}

	// ค้นหา food and drink ด้วย id
	if tx := entity.DB().Where("id = ?", order_food.Food_and_DrinkID).First(&food_and_drink); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "food ID not found"})
		return
	}

	

	//สร้าง Adding Friend
	bod := entity.Order_Food{
		Approve:        approve,
		Admin:          admin,
		Food_and_Drink: food_and_drink,

		Totold: order_food.Totold,
		Note:       order_food.Note,
		OrderTime: order_food.OrderTime,
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

// GET /order_food/:id
func GetOrder_food(c *gin.Context) {
	var order_food entity.Order_Food
	id := c.Param("id")
	if err := entity.DB().Preload("Food_and_Drink").Preload("Admin").Preload("Approve").Raw("SELECT * FROM order_foods WHERE id = ?", id).Find(&order_food).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": order_food})
}

// GET /oder_foods
func ListOrder_food(c *gin.Context) {
	var order_foods []entity.Order_Food
	if err := entity.DB().Preload("Food_and_Drink").Preload("Admin").Preload("Approve").Raw("SELECT * FROM order_foods ").Find(&order_foods).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": order_foods})
}

// function สำหรับลบ oder ด้วย ID
// DELETE /order_foods/:id
func DeleteOder_food(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM oder_foods WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Order not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /order_food
func UpdateOrder_food(c *gin.Context) {
	var oder_food entity.Order_Food
	if err := c.ShouldBindJSON(&oder_food); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", oder_food.ID).First(&oder_food); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Order not found"})
		return
	}

	if err := entity.DB().Save(&oder_food).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": oder_food})
}
