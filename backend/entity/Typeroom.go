package entity

import (
	"gorm.io/gorm"
)

type Typeroom struct {
	gorm.Model
	Detail string `gorm:"uniqueIndex"`

	Room []Room `gorm:"foreignKey:TyperoomID"`
}