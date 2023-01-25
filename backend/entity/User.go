package entity

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	FirstName            string
	LastName             string
	Email                string `gorm:"uniqueIndex"`
	PhoneNumber          string `gorm:"uniqueIndex"`
	IdentificationNumber string `gorm:"uniqueIndex"`
	StudentID            string `gorm:"uniqueIndex"`
	Age                  uint8
	Password             string `json:"-"`
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
	User           []User `gorm:"foreignkey:EducationLevelID"`
}
