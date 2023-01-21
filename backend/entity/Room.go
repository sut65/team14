package entity

import (
	"gorm.io/gorm"
)

type Room struct {
	gorm.Model
	Detail string `gorm:"uniqueIndex"`

	Building   Building `gorm:"references:id" valid:"-"`
	BuildingID *uint

	Booking []Booking `gorm:"foreignKey:RoomID"`
}
