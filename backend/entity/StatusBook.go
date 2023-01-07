package entity

import (
	"gorm.io/gorm"
)

type StatusBook struct {
	gorm.Model
	Status string `gorm:"uniqueIndex"`

	Approve []Approve `gorm:"foreignKey:StatusBookID"`
}
