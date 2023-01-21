package entity

import (
	"gorm.io/gorm"
)

type Room struct {
	gorm.Model
	Detail string `gorm:"uniqueIndex"`

	Booking []Booking `gorm:"foreignKey:RoomID"`
}
