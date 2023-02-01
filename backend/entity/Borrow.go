package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type Borrow struct {
	gorm.Model
	// เวลาที่ยืม
	Timeofborrow time.Time `valid:"IsnotPast~เวลาไม่ใช่ปัจจุปัน"` // เวลาปัจจุบัน

	// ผู้จองใช้ห้อง
	Admin   User `gorm:"references:id" valid:"-"`
	AdminID *uint

	// การจองใช้ห้องไปหาห้อง
	Approve   Approve `gorm:"references:id" valid:"-"`
	ApproveID *uint

	// //ประเภทอุปกรณ์
	// DeviceType DeviceType	`gorm:"references:id" valid:"-"`
	// DeviceTypeID *uint

	// อุปกรณ์
	Device   Device `gorm:"references:id" valid:"-"`
	DeviceID *uint

	Payback        []Payback    `gorm:"foreignKey:BorrowID"`

	BorrowNote1 string `valid:"required~กรุณากรอกหมายเหตุ1"`
	BorrowAPNote string `valid:"required~รหัสการอนุมัติ ต้องขึ้นต้นด้วย Ap ตามด้วยตัวเลข 5 หลัก"`

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
