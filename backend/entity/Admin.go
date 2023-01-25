package entity

import (
	"gorm.io/gorm"
)

type Admin struct {
	gorm.Model
	AdminName string `gorm:"uniqueIndex"`
	AdminEmail  string `gorm:"uniqueIndex"`

	UserID		*uint
	GenderID	*uint
	RoleID		*uint

	User		User		`gorm:"references:id"`
	Role		Role		`gorm:"references:id"`
	Gender		Gender		`gorm:"references:id"`

}