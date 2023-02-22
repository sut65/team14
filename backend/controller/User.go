package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team14/entity"
	"golang.org/x/crypto/bcrypt"
)

// // POST /users
// func CreateUser(c *gin.Context) {
// 	var user entity.User
// 	if err := c.ShouldBindJSON(&user); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	if err := entity.DB().Create(&user).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": user})
// }

// GET /User
func GetUser(c *gin.Context) {
	var user entity.User
	id := c.Param("id")
	if err := entity.DB().Preload("Role").Preload("Gender").Preload("EducationLevel").Raw("SELECT * FROM users WHERE id = ?", id).Find(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": user})
}

// GET /Users
func ListUsers(c *gin.Context) {
	var users []entity.User
	if err := entity.DB().Preload("Gender").Preload("Role").Preload("EducationLevel").Raw("SELECT * FROM users").Find(&users).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": users})
}

// GET /Users
func ListOnlyUsers(c *gin.Context) {
	var users []entity.User
	if err := entity.DB().Preload("Gender").Preload("Role").Preload("EducationLevel").Raw("SELECT * FROM users WHERE role_id = 1").Find(&users).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": users})
}

// DELETE /users/:id
func DeleteUser(c *gin.Context) {
	var User entity.User
	id := c.Param("id")
	// UPDATE user SET deleted_at="now" WHERE id = ?;
	if tx := entity.DB().Where("id = ?", id).Delete(&User); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /users
func UpdateUser(c *gin.Context) {
	var user entity.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var us entity.User
	var gender entity.Gender
	var educationlevel entity.EducationLevel
	var role entity.Role

	if tx := entity.DB().Where("id = ?", user.ID).First(&us); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบรายชื่อสมาชิก"})
		return
	}
	if tx := entity.DB().Where("id = ?", user.RoleID).First(&role); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบบทบาท]"})
		return
	}
	if tx := entity.DB().Where("id = ?", user.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบเพศ"})
		return
	}
	if tx := entity.DB().Where("id = ?", user.EducationLevelID).First(&educationlevel); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบระดับการศึกษา"})
		return
	}

	hashPassword, err := bcrypt.GenerateFromPassword([]byte(string(user.Password)), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
		return
	}

	us.Gender = gender
	us.Role = role
	us.EducationLevel = educationlevel
	us.FirstName = user.FirstName
	us.LastName = user.LastName
	us.Email = user.Email
	us.PhoneNumber = user.PhoneNumber
	us.IdentificationNumber = user.IdentificationNumber
	us.StudentID = user.StudentID
	us.Age = user.Age

	if user.Password != "" {
		us.Password = user.Password
	}

	us.BirthDay = user.BirthDay

	if _, err := govalidator.ValidateStruct(us); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if user.Password != "" {
		us.Password = string(hashPassword)
	}

	if err := entity.DB().Save(&us).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": us})
}

// GET /Genders
func ListGenders(c *gin.Context) {
	var genders []entity.Gender
	if err := entity.DB().Raw("SELECT * FROM genders").Scan(&genders).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": genders})
}

// GET /EducationLevels
func ListEducationLevels(c *gin.Context) {
	var educationlevels []entity.EducationLevel
	if err := entity.DB().Raw("SELECT * FROM education_levels").Scan(&educationlevels).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": educationlevels})
}

// GET /Roles
func ListRoles(c *gin.Context) {
	var roles []entity.Role
	if err := entity.DB().Raw("SELECT * FROM roles").Scan(&roles).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": roles})
}

// GET /User/StudentID/:StudentID ---------- add friend ----------------
func GetUserByStudentID(c *gin.Context) {
	var user entity.User
	studentID := c.Param("StudentID")
	if err := entity.DB().Preload("Role").Preload("Gender").Preload("EducationLevel").Raw("SELECT * FROM users WHERE student_id = ?", studentID).Find(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": user})
}
