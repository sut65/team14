package entity

import (	
	"gorm.io/gorm"	
)

type Food_and_Drink struct{
	gorm.Model

	TypeID *uint
	shopID *uint
	Menu *uint

	Order_Food []Order_Food `gorm:"foreignKey:Food_and_DrinkID"` // ของจัดการร้องขออาหารและเครื่องดื่ม
}