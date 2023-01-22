package entity

import (
	"gorm.io/gorm"
)

type Guard struct {
	gorm.Model
	Detail string `gorm:"uniqueIndex"`

	Building []Building `gorm:"foreignKey:GuardID"`
}
