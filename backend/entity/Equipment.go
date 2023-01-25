package entity

import (
	"gorm.io/gorm"
)

type Equipment struct {
	gorm.Model
	EquipmentName string `gorm:"uniqueIndex"`
	StatusDevice	bool	`gorm:"uniqueIndex"`

	BrandID		*uint
	TypeID		*uint
	//AdminID
	
	//Borrow []Borrow `gorm:"foreignKey:DeviceID"`
	//Payback	[]Payback	`gorm:"foreignKey:DeviceID"`
}

type Brand struct {
	gorm.Model
	BrandName string `gorm:"uniqueIndex"`
	Equipment []Equipment `gorm:"foreignkey:BrandID"`
}

type Type struct {
	gorm.Model
	TypeName string `gorm:"uniqueIndex"`
	Equipment []Equipment `gorm:"foreignkey:TypeID"`
}