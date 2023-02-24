package entity

import (
	"gorm.io/gorm"
)

type Device struct {
	gorm.Model
	Detail           string `gorm:"uniqueIndex" valid:"required~กรุณากรอกชื่ออุปกรณ์"`
	Number			 int  `valid:"range(1|100)~จำนวนไม่ต่ำกว่า 0"`
	Note             string `valid:"required~กรุณากรอกหมายเหตุ"`
	StatusDevice     bool

	Brand   Brand `gorm:"references:id" valid:"-"`
	BrandID *uint

	DeviceType   DeviceType `gorm:"references:id" valid:"-"`
	DeviceTypeID *uint

	Borrow  []Borrow  `gorm:"foreignKey:DeviceID"`
	Payback []Payback `gorm:"foreignKey:DeviceID"`

	Admin   User `gorm:"references:id" valid:"-"`
	AdminID *uint
}

type DeviceType struct {
	gorm.Model
	DeviceTypeDetail string   `gorm:"uniqueIndex"`
	Device           []Device `gorm:"foreignkey:DeviceTypeID"`
	//Borrow []Borrow `gorm:"foreignkey:DeviceTypeID"`
}

type Brand struct {
	gorm.Model
	BrandDetail string   `gorm:"uniqueIndex"`
	Device      []Device `gorm:"foreignkey:DeviceTypeID"`
}
