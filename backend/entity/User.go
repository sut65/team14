package entity

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	FirstName string
	LastName  string
	Email     string `gorm:"uniqueIndex"`
	Age       uint8
	Password  string `json:"-"`

	Approve    []Approve       `gorm:"foreignKey:UserID"`
	Booking    []Booking       `gorm:"foreignKey:UserID"`
	Friend     []Adding_Friend `gorm:"foreignKey:UserID"`  //  เพื่อนที่เพิ่ม
	Admin_add  []Adding_Friend `gorm:"foreignKey:AdminID"` //  ผู้ที่เพิ่ม
	Order_Food []Order_Food    `gorm:"foreignKey:AdminID"` // ของจัดการร้องขออาหารและเครื่องดื่ม
	Borrow     []Borrow        `gorm:"foreignKey:AdminID"`
	Payback    []Payback		`gorm:"foreignKey:AdminID"`
}
