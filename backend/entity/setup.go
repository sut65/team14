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
	database.AutoMigrate(&Building{})
	database.AutoMigrate(&StatusBook{})
	database.AutoMigrate(&Objective{})
	database.AutoMigrate(&Adding_Friend{})
	database.AutoMigrate(&Food_and_Drink{})
	database.AutoMigrate(&Order_Food{})

	db = database

	password, _ := bcrypt.GenerateFromPassword([]byte("123456"), 14)

	db.Model(&Building{}).Create(&Building{Detail: "ตึกA"})
	db.Model(&Building{}).Create(&Building{Detail: "ตึกB"})
	var building1, building2 Building
	db.Raw("SELECT * FROM buildings WHERE detail = ?", "ตึกA").Scan(&building1)
	db.Raw("SELECT * FROM buildings WHERE detail = ?", "ตึกB").Scan(&building2)

	db.Model(&Objective{}).Create(&Objective{Detail: "เรียน"})
	db.Model(&Objective{}).Create(&Objective{Detail: "เล่น"})
	var obj1, obj2 Objective
	db.Raw("SELECT * FROM objectives WHERE detail = ?", "เรียน").Scan(&obj1)
	db.Raw("SELECT * FROM objectives WHERE detail = ?", "เล่น").Scan(&obj2)

	db.Model(&Room{}).Create(&Room{Detail: "A4101", Building: building1})
	db.Model(&Room{}).Create(&Room{Detail: "B1101", Building: building2})
	var r1, r2 Room
	db.Raw("SELECT * FROM rooms WHERE detail = ?", "A4101").Scan(&r1)
	db.Raw("SELECT * FROM rooms WHERE detail = ?", "B1101").Scan(&r2)

	db.Model(&User{}).Create(&User{
		FirstName: "A", LastName: "B",
		Email: "test@gmail.com", Age: 21, Password: string(password),
	})
	var u1 User
	db.Raw("SELECT * FROM users WHERE Email = ?", "test@gmail.com").Scan(&u1)
	db.Model(&User{}).Create(&User{
		FirstName: "C", LastName: "D",
		Email: "CD@gmail.com", Age: 50, Password: string(password),
	})
	var u2 User
	db.Raw("SELECT * FROM users WHERE Email = ?", "test@gmail.com").Scan(&u2)

	t1, _ := time.Parse(time.RFC3339, "2023-01-30T14:00:00+07:00")
	t2, _ := time.Parse(time.RFC3339, "2023-01-30T16:00:00+07:00")
	db.Model(&Booking{}).Create(&Booking{
		Date_Start: t1, Date_End: t2,
		User: u1, Room: r2, Objective: obj2,
	})

}
