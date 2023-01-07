package entity

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	FirstName string
	LastName  string
	Email     string `gorm:"uniqueIndex"`
	Age       uint8

	Booking []Booking `gorm:"foreignKey:UserID"`
}
