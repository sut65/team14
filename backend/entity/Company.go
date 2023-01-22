package entity

import (
	"gorm.io/gorm"
)

type Company struct {
	gorm.Model
	Detail string `gorm:"uniqueIndex"`

	Building   []Building      `gorm:"foreignKey:CompanyID"`
}
