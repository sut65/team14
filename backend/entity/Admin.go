package entity

import (
	"gorm.io/gorm"
)

type Admin struct {
	gorm.Model
	AdminName string `gorm:"uniqueIndex"`
	AdminEmail  string `gorm:"uniqueIndex"`

	BrandID		*uint
	TypeID		*uint
	//AdminID
	
	//Borrow []Borrow `gorm:"foreignKey:DeviceID"`
	//Payback	[]Payback	`gorm:"foreignKey:DeviceID"`
}