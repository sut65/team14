package entity

import (
	"gorm.io/gorm"
)

type Device struct {
	gorm.Model
	Detail string `gorm:"uniqueIndex"`


	StatusDevice	bool	`gorm:"uniqueIndex"`
	
	DeviceType   DeviceType `gorm:"references:id" valid:"-"`
	DeviceTypeID *uint
	
	Borrow []Borrow `gorm:"foreignKey:DeviceID"`
	Payback	[]Payback	`gorm:"foreignKey:DeviceID"`
}

type DeviceType struct {
	gorm.Model
	Name string `gorm:"uniqueIndex"`
	Device []Device `gorm:"foreignkey:DeviceTypeID"`

}