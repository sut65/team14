package entity

import (
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
	database.AutoMigrate(&Device{})
	database.AutoMigrate(&Adding_Friend{})
	database.AutoMigrate(&Borrow{})
	database.AutoMigrate(&Food_and_Drink{})
	database.AutoMigrate(&Order_Food{})
	database.AutoMigrate(&Payback{})

	db = database

	password, _ := bcrypt.GenerateFromPassword([]byte("123456"), 14)

	db.Model(&User{}).Create(&User{
		FirstName: "A", LastName: "B",
		Email: "test@gmail.com", PhoneNumber: "123456",
		IdentificationNumber: "123456", StudentID: "123456",
		Age:      21,
		Password: string(password),
	})
	var u1 User
	db.Raw("SELECT * FROM users WHERE Email = ?", "test@gmail.com").Scan(&u1)
	db.Model(&User{}).Create(&User{
		FirstName: "C", LastName: "D",
		Email: "CD@gmail.com", 
		Age: 50, Password: string(password),
	})
	var u2 User
	db.Raw("SELECT * FROM users WHERE Email = ?", "test@gmail.com").Scan(&u2)

	db.Model(&StatusBook{}).Create(&StatusBook{Detail: "อนุมัติ"})
	db.Model(&StatusBook{}).Create(&StatusBook{Detail: "ไม่อนุมัติ"})

	db.Model(&Company{}).Create(&Company{Detail: "บริษัท ซินเท็ค คอนสตรัคชั่น จำกัด(มหาชน)"})
	db.Model(&Company{}).Create(&Company{Detail: "บริษัท แสงฟ้า จำกัด"})
	var company1, company2 Company
	db.Raw("SELECT * FROM companies WHERE detail = ?", "บริษัท ซินเท็ค คอนสตรัคชั่น จำกัด(มหาชน)").Scan(&company1)
	db.Raw("SELECT * FROM companies WHERE detail = ?", "บริษัท แสงฟ้า จำกัด").Scan(&company2)

	db.Model(&Guard{}).Create(&Guard{Detail: "นายส้ม เปรี้ยว"})
	db.Model(&Guard{}).Create(&Guard{Detail: "นายมะม่วง หวาน"})
	var guard1, guard2 Guard
	db.Raw("SELECT * FROM guards WHERE detail = ?", "นายส้ม เปรี้ยว").Scan(&guard1)
	db.Raw("SELECT * FROM guards WHERE detail = ?", "นายมะม่วง หวาน").Scan(&guard2)

	db.Model(&Building{}).Create(&Building{
		Admin: u1, Guard: guard1, Company: company1, Detail: "ตึกA"})
	var building1 Building
	db.Raw("SELECT * FROM buildings WHERE detail = ?", "ตึกA").Scan(&building1)
	db.Model(&Building{}).Create(&Building{
		Admin: u1, Guard: guard2, Company: company2,
		Detail: "ตึกB"})
	var building2 Building
	db.Raw("SELECT * FROM buildings WHERE detail = ?", "ตึกB").Scan(&building2)

	db.Model(&Objective{}).Create(&Objective{Detail: "เรียน"})
	db.Model(&Objective{}).Create(&Objective{Detail: "เล่น"})
	var obj1, obj2 Objective
	db.Raw("SELECT * FROM objectives WHERE detail = ?", "เรียน").Scan(&obj1)
	db.Raw("SELECT * FROM objectives WHERE detail = ?", "เล่น").Scan(&obj2)

	db.Model(&Typeroom{}).Create(&Typeroom{Detail: "ห้องพัดลม"})
	db.Model(&Typeroom{}).Create(&Typeroom{Detail: "ห้องแอร์"})
	var typeroom1, typeroom2 Typeroom
	db.Raw("SELECT * FROM buildings WHERE detail = ?", "ห้องพัดลม").Scan(&typeroom1)
	db.Raw("SELECT * FROM buildings WHERE detail = ?", "ห้องแอร์").Scan(&typeroom2)

	db.Model(&Room{}).Create(&Room{
		Admin: u1, Typeroom: typeroom1, Detail: "A4101", Building: building1})
	var r1 Room
	db.Raw("SELECT * FROM rooms WHERE detail = ?", "A4101").Scan(&r1)
	db.Model(&Room{}).Create(&Room{
		Admin: u1, Typeroom: typeroom2, Detail: "A1101", Building: building2})
	var r2 Room
	db.Raw("SELECT * FROM rooms WHERE detail = ?", "B1101").Scan(&r2)

	// t1, _ := time.Parse(time.RFC3339, "2023-01-30T14:00:00+07:00")
	// t2, _ := time.Parse(time.RFC3339, "2023-01-30T16:00:00+07:00")
	// db.Model(&Booking{}).Create(&Booking{
	// 	Date_Start: t1, Date_End: t2,
	// 	User: u1, Room: r2, Objective: obj2,
	// })

}
