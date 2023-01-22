package entity

import (	
	"gorm.io/gorm"	
)

type Food_and_Drink struct{
	gorm.Model

	TypeID *uint
	ShopID *uint
	Menu *uint	`gorm:"uniqueIndex"`
	// Admin ผู้เพิ่มอาหาร
	Admin   User `gorm:"references:id" valid:"-"`
	AdminID *uint

	Order_Food []Order_Food `gorm:"foreignKey:Food_and_DrinkID"` // ของจัดการร้องขออาหารและเครื่องดื่ม
}