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

		Totold:    order_food.Totold,
		Note:      order_food.Note,
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
	if err := entity.DB().Preload("Food_and_Drink").Preload("Admin").Preload("Approve").Raw("SELECT * FROM order_foods WHERE id = ? and deleted_at is NULL", id).Find(&order_food).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": order_food})
}

// GET /oder_foods
func ListOrder_food(c *gin.Context) {
	var order_foods []entity.Order_Food
	if err := entity.DB().Preload("Food_and_Drink").Preload("Admin").Preload("Approve").Raw("SELECT * FROM order_foods where deleted_at is NULL ").Find(&order_foods).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": order_foods})
}

// GET /oder_foods/Booking/:code
func ListOrderByBookingCode(c *gin.Context) {
	var order_foods []entity.Order_Food
	code := c.Param("code")
	if err := entity.DB().Preload("Food_and_Drink").Preload("Admin").Preload("Approve").
		Raw("Select O.* from bookings b inner JOIN approves a inner JOIN order_foods o INNER JOIN food_and_drinks f on a.booking_id = b.id and b.deleted_at is NULL AND  b.code = ? and o.approve_id = a.id and o.food_and_drink_id = f.id and O.deleted_at is NULL", code).Find(&order_foods).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": order_foods})
}

// function สำหรับลบ oder ด้วย ID
// DELETE /order_foods/:id
func DeleteOrder_food(c *gin.Context) {
	var order_food entity.Order_Food
	id := c.Param("id")
	// UPDATE add_Friend SET deleted_at="now" WHERE id = ?;
	if tx := entity.DB().Where("id = ?", id).Delete(&order_food); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Add Friend not found"})
		return
	}

}

// PATCH /order_food
func UpdateOrder_food(c *gin.Context) {
	var order entity.Order_Food
	var tmp entity.Order_Food

	if err := c.ShouldBindJSON(&order); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา order ด้วย ID
	if tx := entity.DB().Where("id = ?", order.ID).First(&tmp); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "order not found"})
		return
	}

	var admin entity.User
	var food_and_drink entity.Food_and_Drink
	var approve entity.Approve

	// ค้นหา Amin ด้วย id
	if tx := entity.DB().Where("id = ?", order.AdminID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	// ค้นหา Approve ด้วย id
	if tx := entity.DB().Where("id = ?", order.ApproveID).First(&approve); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Approve ID not found"})
		return
	}

	// ค้นหา food and drink ด้วย id
	if tx := entity.DB().Where("id = ?", order.Food_and_DrinkID).First(&food_and_drink); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "food ID not found"})
		return
	}

	tmp.Approve = approve
	tmp.Admin = admin
	tmp.Totold = order.Totold
	tmp.Note = order.Note

	// ขั้นตอนการ validate
	if _, err := govalidator.ValidateStruct(tmp); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Save(&tmp).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": tmp})
}
