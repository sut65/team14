package entity

import (
	"gorm.io/gorm"
)

type Room struct {
	gorm.Model

	Admin   User `gorm:"references:id" valid:"-"`
	AdminID *uint

	Typeroom Typeroom `gorm:"references:id" valid:"-"`
	TyperoomID *uint
	
	Detail string `gorm:"uniqueIndex"`

	Building   Building `gorm:"references:id" valid:"-"`
	BuildingID *uint

	Booking []Booking `gorm:"foreignKey:RoomID"`
}
