package controller

import (
	"fmt"
	"net/http"
	"time"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team14/entity"
	"github.com/sut65/team14/service"
	"golang.org/x/crypto/bcrypt"
)

// LoginPayload login body
type LoginPayload struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// SignUpPayload signup body
type SignUpPayload struct {
	FirstName            string    `json:"firstName"`
	LastName             string    `json:"lastName"`
	Email                string    `json:"email"`
	Password             string    `json:"password"`
	PhoneNumber          string    `json:"PhoneNumber"`
	IdentificationNumber string    `json:"IdentificationNumber"`
	StudentID            string    `json:"StudentID"`
	Age                  uint8     `json:"Age"`
	BirthDay             time.Time `json:"BirthDay"`

	RoleID           uint `json:"RoleID"`
	GenderID         uint `json:"GenderID"`
	EducationLevelID uint `json:"EducationLevelID"`
}

// LoginResponse token response
type LoginResponse struct {
	Token string `json:"token"`
	ID    uint   `json:"id"`
}

// POST /login
func Login(c *gin.Context) {
	var payload LoginPayload
	var user entity.User

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา user ด้วย email ที่ผู้ใช้กรอกเข้ามา
	if err := entity.DB().Raw("SELECT * FROM users WHERE email = ?", payload.Email).Scan(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตรวจสอบรหัสผ่าน
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(payload.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "password is incorrect"})
		return
	}

	// กำหนดค่า SecretKey, Issuer และระยะเวลาหมดอายุของ Token สามารถกำหนดเองได้
	// SecretKey ใช้สำหรับการ sign ข้อความเพื่อบอกว่าข้อความมาจากตัวเราแน่นอน
	// Issuer เป็น unique id ที่เอาไว้ระบุตัว client
	// ExpirationHours เป็นเวลาหมดอายุของ token

	jwtWrapper := service.JwtWrapper{
		SecretKey:       "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
		Issuer:          "AuthService",
		ExpirationHours: 24,
	}

	signedToken, err := jwtWrapper.GenerateToken(user.Email)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error signing token"})
		return
	}

	tokenResponse := LoginResponse{
		Token: signedToken,
		ID:    user.ID,
	}

	c.JSON(http.StatusOK, gin.H{"data": tokenResponse})
}

// POST /create
func CreateUser(c *gin.Context) {
	var payload SignUpPayload
	var gender entity.Gender
	var role entity.Role
	var educationlevel entity.EducationLevel

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ x จะถูก bind เข้าตัวแปร User
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// x: ค้นหา gender ด้วย id
	if tx := entity.DB().Where("id = ?", payload.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	// x: ค้นหา role ด้วย id
	if tx := entity.DB().Where("id = ?", payload.RoleID).First(&role); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "role not found"})
		return
	}

	// x: ค้นหา EducationLevel ด้วย id
	if tx := entity.DB().Where("id = ?", payload.EducationLevelID).First(&educationlevel); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "educationLevel not found"})
		return
	}
	fmt.Println(payload.Password)
	// เข้ารหัสลับรหัสผ่านที่ผู้ใช้กรอกก่อนบันทึกลงฐานข้อมูล
	hashPassword, err := bcrypt.GenerateFromPassword([]byte(string(payload.Password)), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
		return
	}
	//x: สร้าง User
	us := entity.User{
		Role:           role,
		Gender:         gender,
		EducationLevel: educationlevel,

		FirstName:            payload.FirstName,
		LastName:             payload.LastName,
		Email:                payload.Email,
		PhoneNumber:          payload.PhoneNumber,
		IdentificationNumber: payload.IdentificationNumber,
		StudentID:            payload.StudentID,
		Age:                  payload.Age,
		Password:             string(hashPassword),
		BirthDay:             payload.BirthDay,
	}

	fmt.Println(us.Password)

	// ขั้นตอนการ validate
	if _, err := govalidator.ValidateStruct(us); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// x: บันทึก
	if err := entity.DB().Create(&us).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": us})

}
