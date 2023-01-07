package entity

import (
	"gorm.io/gorm"
)

type Objective struct {
	gorm.Model
	Detail string `gorm:"uniqueIndex"`

	Booking []Booking `gorm:"foreignKey:ObjectiveID"`
}
