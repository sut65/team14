package entity

import (
	"gorm.io/gorm"
)

type Building struct {
	gorm.Model
	Detail string `gorm:"uniqueIndex"`

	Room []Room `gorm:"foreignKey:BuildingID"`
}
