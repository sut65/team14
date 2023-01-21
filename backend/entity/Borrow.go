package entity

import (
	"time"
	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type Borrow struct {
	gorm.Model
	// เวลาที่ยืม
	Timeofborrow time.Time `valid:"IsPresent~เวลาไม่ใช่ปัจจุปัน"` // เวลาปัจจุบัน
	
	// ห้องที่จอง-เมื่อกี้เพิ่มผิดissue
	Room   Room `gorm:"references:id" valid:"-"`
	RoomID *uint

	// ผู้จองใช้ห้อง
	User   Approve `gorm:"references:id" valid:"-"`
	UserID *uint

	// การจองใช้ห้องไปหาห้อง
	Booking   Approve `gorm:"references:id" valid:"-"`
	BookingID *uint

	// อุปกรณ์
	Device	Device	`gorm:"references:id" valid:"-"`
	DeviceID	*uint

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