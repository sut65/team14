package entity

import (
	"gorm.io/gorm"
)

type Building struct {
	gorm.Model

	Admin   User `gorm:"references:id" valid:"-"`
	AdminID *uint

	Guard  Guard `gorm:"references:id" valid:"-"`
	GuardID *uint

	Company Company `gorm:"references:id" valid:"-"`
	CompanyID *uint

	Detail string `gorm:"uniqueIndex"`

	Room []Room `gorm:"foreignKey:BuildingID"`
}
