package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type Approve struct {
	gorm.Model

	Code        string    `gorm:"uniqueIndex" valid:"matches(^[A][p]\\d{5}$)~รหัสการอนุมัติ ต้องขึ้นต้นด้วย Ap ตามด้วยตัวเลข 5 หลัก, required~กรุณากรอกรหัสการอนุมัติ"`
	Note        string    `valid:"required~กรุณากรอกหมายเหตุ"`
	ApproveTime time.Time `valid:"DelayNow3Min~เวลาที่อนุมัติไม่ถูกต้อง"` // เป็นปัจจุบัน +- 3 นาที

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
	Adding_Friend []Adding_Friend `gorm:"foreignKey:ApproveID"` //ของเพิ่มเพื่อน
	Order_Food    []Order_Food    `gorm:"foreignKey:ApproveID"` // ของจัดการร้องขออาหารและเครื่องดื่ม
}

func init() {
	govalidator.CustomTypeTagMap.Set("IsFuture", func(i interface{}, _ interface{}) bool {
		t := i.(time.Time)
		return t.After(time.Now())
	})

	govalidator.CustomTypeTagMap.Set("IsPresent", func(i interface{}, _ interface{}) bool {
		t := i.(time.Time)
		return t.After(time.Now().AddDate(0, 0, -1)) && t.Before(time.Now().AddDate(0, 0, 1))
	})

	govalidator.CustomTypeTagMap.Set("IsPast", func(i interface{}, _ interface{}) bool {
		t := i.(time.Time)
		return t.Before(time.Now())
	})
	govalidator.CustomTypeTagMap.Set("IsnotPast", func(i interface{}, _ interface{}) bool {
		t := i.(time.Time)
		// ย้อนหลังไม่เกิน 1 วัน
		return t.After(time.Now().AddDate(0, 0, -1))
	})
	govalidator.CustomTypeTagMap.Set("IsnotPastAndnotFuture", func(i interface{}, _ interface{}) bool {
		t := i.(time.Time)
		// +- 1 วัน
		return t.After(time.Now().AddDate(0, 0, -1)) && t.After(time.Now().AddDate(0, 0, 1))
	})
	govalidator.CustomTypeTagMap.Set("DelayNow3Min", func(i interface{}, _ interface{}) bool {
		t := i.(time.Time)
		a := t.After(time.Now().Add(-3 * time.Minute))
		b := t.Before(time.Now().Add(+3 * time.Minute))
		sts := a && b
		return sts
	})
	govalidator.CustomTypeTagMap.Set("IsNotNegativeNumbers", func(i interface{}, _ interface{}) bool {
		n := i.(float32)
		return n >= 0
	})
}
