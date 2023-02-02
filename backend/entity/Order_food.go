package entity

import (
	//"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
	"time"
)

type Order_Food struct {
	gorm.Model	
	Totold *uint
	Note        string    `valid:"required~กรุณากรอกหมายเหตุ"`
	OrderTime time.Time `valid:"IsnotPast~เวลาไม่ถูกต้อง"`
	// การอนุมัติ .
	Approve Approve `gorm:"references:id" valid:"-"`
	ApproveID *uint		
	
	// อาหารและเครื่องดื่ม
	Food_and_Drink Food_and_Drink `gorm:"references:id" valid:"-"`
	Food_and_DrinkID *uint
	
	// ผู้ที่บันทึกเข้าระบบ
	Admin User `gorm:"references:id" valid:"-"`
	AdminID *uint
}