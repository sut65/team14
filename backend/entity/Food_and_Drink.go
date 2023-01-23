package entity

import (
	"gorm.io/gorm"
)

type Food_and_Drink struct {
	gorm.Model

	Menu *uint `gorm:"uniqueIndex"`

	Type   Type `gorm:"references:id"`
	TypeID *uint

	Shop   Shop `gorm:"references:id"`
	ShopID *uint

	// Admin ผู้เพิ่มอาหาร
	Admin   User `gorm:"references:id" valid:"-"`
	AdminID *uint

	Order_Food     []Order_Food     `gorm:"foreignKey:Food_and_DrinkID"` // ของจัดการร้องขออาหารและเครื่องดื่ม
}

type Type struct {
	gorm.Model
	Name string `gorm:"uniqueIndex"`

	Food_and_Drink []Food_and_Drink `gorm:"foreignkey:TypeID"`
}

type Shop struct {
	gorm.Model
	Name string `gorm:"uniqueIndex"`

	Food_and_Drink []Food_and_Drink `gorm:"foreignkey:ShopID"`
}
