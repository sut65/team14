package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type Booking struct {
	gorm.Model

	Date_Start time.Time `valid:"IsFuture~กรุณาเลือกเวลาล่วงหน้า"` // เวลาอนาคต A
	Date_End   time.Time `valid:"IsFuture~กรุณาเลือกเวลาล่วงหน้า"` // เวลาอนาคต B โดย B > A ตรงเช็ดด้วย

	// ผู้จองใช้ห้อง
	User   User `gorm:"references:id" valid:"-"`
	UserID *uint

	// วัตถุประสงค์
	Objective   Objective `gorm:"references:id" valid:"-"`
	ObjectiveID *uint

	// ห้องที่จอง
	Room   Room `gorm:"references:id" valid:"-"`
	RoomID *uint

	Approve []Approve `gorm:"foreignKey:BookingID"`
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
	govalidator.CustomTypeTagMap.Set("IsnotPast", func(i interface{}, o interface{}) bool {
		t := i.(time.Time)
		// ย้อนหลังไม่เกิน 1 วัน
		return t.After(time.Now().AddDate(0, 0, -1))
	})
}
