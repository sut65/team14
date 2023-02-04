package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type Payback struct {
	gorm.Model
	// เวลาที่ยืม
	Timeofpayback time.Time `valid:"IsnotPast~เวลาไม่ใช่ปัจจุปัน"` // เวลาปัจจุบัน

	// ผู้จองใช้ห้อง
	Admin   User `gorm:"references:id" valid:"-"`
	AdminID *uint

	// การจองใช้ห้องไปหาห้อง
	Borrow   Borrow `gorm:"references:id" valid:"-"`
	BorrowID *uint

	// อุปกรณ์
	Device   Device `gorm:"references:id" valid:"-"`
	DeviceID *uint

	PBADNote string `valid:"required~กรุณากรอกหมายเหตุจากผู้บันทึก"`
	PBusNote string `valid:"required~กรุณากรอกหมายเหตุจากผู้ยืม"`
}

func init() {
	govalidator.CustomTypeTagMap.Set("IsFuture", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.After(time.Now())
	})

	govalidator.CustomTypeTagMap.Set("IsPresent", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.Equal(time.Now())
	})
	
	govalidator.CustomTypeTagMap.Set("IsnotPast", func(i interface{}, o interface{}) bool {
		t := i.(time.Time)
		// ย้อนหลังไม่เกิน 1 วัน
		return t.After(time.Now().AddDate(0, 0, -1))
	})

	govalidator.CustomTypeTagMap.Set("IsPast", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.Before(time.Now())
	})
}
