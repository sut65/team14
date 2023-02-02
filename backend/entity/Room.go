package entity

import (
	"time"

	"gorm.io/gorm"
)

type Room struct {
	gorm.Model

	Admin   User `gorm:"references:id" valid:"-"`
	AdminID *uint

	Typeroom   Typeroom `gorm:"references:id" valid:"-"`
	TyperoomID *uint

	Detail string    `gorm:"uniqueIndex" valid:"required~กรุณากรอกเลขห้อง"`
	Note   string    `valid:"required~กรุณากรอกหมายเหตุ"`
	Time   time.Time `valid:"IsnotPast~เวลาที่อนุมัติไม่ถูกต้อง"` // เป็นปัจจุบัน +- 3 นาที

	Building   Building `gorm:"references:id" valid:"-"`
	BuildingID *uint

	Booking []Booking `gorm:"foreignKey:RoomID"`
}
