package entity

import (
	//"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
	//"time"
)

type Adding_Friend struct {
	gorm.Model

	// การจองห้อง .
	Booking   Booking `gorm:"references:id" valid:"-"`
	BookingID *uint

	// เพื่อนที่เพิ่ม
	User   User `gorm:"references:id"  valid:"-"`
	UserID *uint

	// ผู้ที่เพิ่มเข้าระบบ
	Admin   User `gorm:"references:id" valid:"-"`
	AdminID *uint
}
