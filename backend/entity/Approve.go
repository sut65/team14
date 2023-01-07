package entity

import (
	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
	"time"
)

type Approve struct {
	gorm.Model
	// เวลาที่อนุมัติ
	Time time.Time `valid:"IsPresent~เวลาไม่ใช่ปัจจุปัน"` // เวลาปัจจุบัน

	// ผู้อนุมัติ
	User   User `gorm:"references:id" valid:"-"`
	UserID *uint

	// การจองใช้ห้อง
	Booking   Booking `gorm:"references:id" valid:"-"`
	BookingID *uint

	// สถานะการจองใช้ห้อง
	StatusBook   StatusBook `gorm:"references:id" valid:"-"`
	StatusBookID *uint

	/* // ถูกลบหรือยัง
	Status bool
	*/
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

	govalidator.CustomTypeTagMap.Set("IsPast", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.Before(time.Now())
	})
}
