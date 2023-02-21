package entity

import (
	"gorm.io/gorm"
)

type Device struct {
	gorm.Model
	Detail           string `gorm:"uniqueIndex" valid:"required~กรุณากรอกชื่ออุปกรณ์"`
	Number_of_Device uint8  `valid:"required~กรุณาใส่จำนวน"`
	Note             string `valid:"required~กรุณากรอกหมายเหตุ"`
	StatusDevice     bool

	Brand   Brand `gorm:"references:id" valid:"-"`
	BrandID *uint

	DeviceType   DeviceType `gorm:"references:id" valid:"-"`
	DeviceTypeID *uint

	Borrow  []Borrow  `gorm:"foreignKey:DeviceID"`
	Payback []Payback `gorm:"foreignKey:DeviceID"`
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
