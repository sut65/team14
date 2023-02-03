package entity

import (
	"time"

	"gorm.io/gorm"
)

type Building struct {
	gorm.Model

	Admin   User `gorm:"references:id" valid:"-"`
	AdminID *uint

	Guard  Guard `gorm:"references:id" valid:"-"`
	GuardID *uint

	Company Company `gorm:"references:id" valid:"-"`
	CompanyID *uint

	Detail string    `gorm:"uniqueIndex" valid:"required~กรุณากรอกชื่อตึก"`
	Note   string    `valid:"required~กรุณากรอกหมายเหตุ"`
	Time   time.Time `valid:"IsnotPast~เวลาที่อนุมัติไม่ถูกต้อง"` // เป็นปัจจุบัน +- 3 นาที

	Room []Room `gorm:"foreignKey:BuildingID"`
}
