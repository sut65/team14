package entity

import (
	//"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
	"time"
)

type Adding_Friend struct {
	gorm.Model

	Note        string    `valid:"required~กรุณากรอกหมายเหตุ"`
	AddfriendTime time.Time `valid:"IsnotPast~เวลาไม่ถูกต้อง"`

	// การจองห้อง .
	Approve   Approve `gorm:"references:id" valid:"-"`
	ApproveID *uint

	// เพื่อนที่เพิ่ม
	User   User `gorm:"references:id"  valid:"-"`
	UserID *uint

	// ผู้ที่เพิ่มเข้าระบบ
	Admin   User `gorm:"references:id" valid:"-"`
	AdminID *uint
}
