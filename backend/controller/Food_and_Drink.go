package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"

	"github.com/sut65/team14/entity"
)

// POST /food_and_drink
func CreateFood_and_Drink(c *gin.Context) {
	var food_and_drink entity.Food_and_Drink
	var foodtype entity.Foodtype
	var shop entity.Shop
	var admin entity.User
	// ผลลัพธ์ที่ได้จากขั้นตอนที่ x จะถูก bind เข้าตัวแปร food_and_drink
	if err := c.ShouldBindJSON(&food_and_drink); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา admin ด้วย id
	if tx := entity.DB().Where("id = ?", food_and_drink.AdminID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบสมาชิก"})
		return
	}

	// ค้นหา foodtype ด้วย id
	if tx := entity.DB().Where("id = ?", food_and_drink.FoodtypeID).First(&foodtype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่ประเภทอาหาร"})
		return
	}

	// ค้นหา shop ด้วย id
	if tx := entity.DB().Where("id = ?", food_and_drink.ShopID).First(&shop); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบร้านค้านี้"})
		return
	}

	//สร้าง food_and_drink
	fad := entity.Food_and_Drink{
		Menu: 	  food_and_drink.Menu,
		Foodtype: foodtype,
		Shop:     shop,
		Admin:    admin,
	}

	// ขั้นตอนการ validate
	if _, err := govalidator.ValidateStruct(fad); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// บันทึก
	if err := entity.DB().Create(&fad).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": fad})
}

// GET /food_and_drink/:id
func GetFood_and_Drink(c *gin.Context) {
	var food_and_drink entity.Food_and_Drink
	id := c.Param("id")
	if err := entity.DB().Preload("Foodtype").Preload("Shop").Preload("Admin").Raw("SELECT * FROM food_and_drinks WHERE id = ?", id).Find(&food_and_drink).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// if tx := entity.DB().Where("id = ?", id).First(&food_and_drink); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "food_and_drink not found"})
	// 	return
	// }

	c.JSON(http.StatusOK, gin.H{"data": food_and_drink})
}

// GET /food_and_drinks
func ListFood_and_Drinks(c *gin.Context) {
	var food_and_drinks []entity.Food_and_Drink
	if err := entity.DB().Preload("Foodtype").Preload("Shop").Preload("Admin").Raw("SELECT * FROM food_and_drinks").Find(&food_and_drinks).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": food_and_drinks})
}

// GET /Shops
func ListShops(c *gin.Context) {
	var shops []entity.Shop
	if err := entity.DB().Raw("SELECT * FROM shops").Scan(&shops).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": shops})
}

// GET /Foodtypes
func ListFoodtypes(c *gin.Context) {
	var foodtypes []entity.Foodtype
	if err := entity.DB().Raw("SELECT * FROM foodtypes").Scan(&foodtypes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": foodtypes})
}

// DELETE /food_and_drinks/:id
func DeleteFood_and_Drink(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM food_and_drinks WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "food_and_drink not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /food_and_drinks
func UpdateFood_and_Drink(c *gin.Context) {
	var food_and_drink entity.Food_and_Drink
	if err := c.ShouldBindJSON(&food_and_drink); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", food_and_drink.ID).First(&food_and_drink); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "objective not found"})
		return
	}
	if err := entity.DB().Save(&food_and_drink).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": food_and_drink})
}
