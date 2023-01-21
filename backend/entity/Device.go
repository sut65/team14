package entity

import (
	"gorm.io/gorm"
)

type Device struct {
	gorm.Model
	Detail string `gorm:"uniqueIndex"`

	Borrow []Borrow `gorm:"foreignKey:ObjectiveID"`
}