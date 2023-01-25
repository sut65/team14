package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type Approve struct {
	gorm.Model

	// ApproveCode string `gorm:"uniqueIndex"` //`gorm:"uniqueIndex" valid:"matches(^\\d{13}$)~ApproveCode Invalid format,required~ApproveCode cannot be blank"`
	Note      string    `valid:"required~ต้องกรอกหมายเหตุ ถ้าไม่มีให้'-'"`
	CreatedAt time.Time `valid:""`

	// ผู้อนุมัติ
	User   User `gorm:"references:id" valid:"-"`
	UserID *uint

	// การจองใช้ห้อง
	Booking   Booking `gorm:"references:id" valid:"-"`
	BookingID *uint

	// สถานะการจองใช้ห้อง
	StatusBook   StatusBook `gorm:"references:id" valid:"-"`
	StatusBookID *uint

	
	Borrow        []Borrow        `gorm:"foreignKey:ApproveID"`
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
