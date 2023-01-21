package entity

import (
	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"

	"gorm.io/driver/sqlite"
)

var db *gorm.DB

func DB() *gorm.DB {

	return db

}

func SetupDatabase() {

	database, err := gorm.Open(sqlite.Open("booking.db"), &gorm.Config{})

	if err != nil {

		panic("failed to connect database")

	}

	// Migrate the schema
	database.AutoMigrate(&User{})
	database.AutoMigrate(&Approve{})
	database.AutoMigrate(&Booking{})
	database.AutoMigrate(&Room{})
	database.AutoMigrate(&StatusBook{})
	database.AutoMigrate(&Objective{})

	db = database

	password, _ := bcrypt.GenerateFromPassword([]byte("123456"), 14)

	db.Model(&Room{}).Create(&Room{Detail: "B4101"})
	db.Model(&Room{}).Create(&Room{Detail: "B4102"})
	db.Model(&Objective{}).Create(&Objective{Detail: "เรียน"})
	db.Model(&Objective{}).Create(&Objective{Detail: "เล่น"})
	db.Model(&User{}).Create(&User{
		FirstName: "A", LastName: "B",
		Email: "test@gmail.com", Age: 21, Password: string(password),
	})

	var r1, r2 Room
	db.Raw("SELECT * FROM rooms WHERE detail = ?", "B4101").Scan(&r1)
	db.Raw("SELECT * FROM rooms WHERE detail = ?", "B4102").Scan(&r2)

	var u1 User
	db.Raw("SELECT * FROM users WHERE Email = ?", "test@gmail.com").Scan(&u1)

	var obj1, obj2 Objective
	db.Raw("SELECT * FROM objectives WHERE detail = ?", "เรียน").Scan(&obj1)
	db.Raw("SELECT * FROM objectives WHERE detail = ?", "เล่น").Scan(&obj2)

	t1, _ := time.Parse(time.RFC3339, "2023-01-12T14:00:00+07:00")
	t2, _ := time.Parse(time.RFC3339, "2023-01-12T16:00:00+07:00")
	db.Model(&Booking{}).Create(&Booking{
		Date_Start: t1, Date_End: t2,
		User: u1, Room: r2, Objective: obj2,
	})

}
