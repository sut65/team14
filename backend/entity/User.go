package entity

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	FirstName            string `valid:"required~กรุณากรอกชื่อ"`
	LastName             string `valid:"required~กรุณากรอกนามสกุล"`
	Email                string `gorm:"uniqueIndex" valid:"email, required~Email: กรุณากรอกอีเมล"`
	PhoneNumber          string `gorm:"uniqueIndex" valid:"matches(^\\d{10}$)~เบอร์โทรศัพท์ต้องมีตัวเลข 10 หลัก, required~กรุณากรอกเบอร์โทรศัพท์"`
	IdentificationNumber string `gorm:"uniqueIndex" valid:"matches(^\\d{13}$)~เลขบัตรประชาชนต้องมีตัวเลข 13 หลัก, required~กรุณากรอกเลขบัตรประชาชน"`
	StudentID            string `gorm:"uniqueIndex" valid:"matches(^[B||M||D]\\d{7}$)~รหัสนักศึกษาต้องขึ้นต้นด้วย B ตามด้วยตัวเลข 7 หลัก, required~กรุณากรอกรหัสนักศึกษา"`
	Age                  uint8  `valid:"range(18|100)~อายุไม่ต่ำกว่า 18"`
	Password             string `json:"-" valid:"minstringlength(6), required~กรุณากรอกรหัสผ่าน"` //error password
	BirthDay             time.Time
	RoleID               *uint
	GenderID             *uint
	EducationLevelID     *uint
	Role                 Role           `gorm:"references:id"`
	Gender               Gender         `gorm:"references:id"`
	EducationLevel       EducationLevel `gorm:"references:id"`

	Approve        []Approve        `gorm:"foreignKey:UserID"`
	Booking        []Booking        `gorm:"foreignKey:UserID"`
	Friend         []Adding_Friend  `gorm:"foreignKey:UserID"`  //  เพื่อนที่เพิ่ม
	Admin_add      []Adding_Friend  `gorm:"foreignKey:AdminID"` //  ผู้ที่เพิ่ม
	Order_Food     []Order_Food     `gorm:"foreignKey:AdminID"` // ของจัดการร้องขออาหารและเครื่องดื่ม
	Borrow         []Borrow         `gorm:"foreignKey:AdminID"`
	Payback        []Payback        `gorm:"foreignKey:AdminID"`
	Building       []Building       `gorm:"foreignKey:AdminID"`
	Room           []Room           `gorm:"foreignKey:AdminID"`
	Food_and_Drink []Food_and_Drink `gorm:"foreignKey:AdminID"` //  ผู้ที่เพิ่ม
}

type Role struct {
	gorm.Model
	Name string `gorm:"uniqueIndex"`
	User []User `gorm:"foreignkey:RoleID"`
}

type Gender struct {
	gorm.Model
	Name string `gorm:"uniqueIndex"`
	User []User `gorm:"foreignkey:GenderID"`
}

type EducationLevel struct {
	gorm.Model
	Name string `gorm:"uniqueIndex"`
	User []User `gorm:"foreignkey:EducationLevelID"`
}
