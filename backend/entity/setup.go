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

	// Migrate the schema 23 ตัว
	database.AutoMigrate(&Adding_Friend{})
	database.AutoMigrate(&Approve{})
	database.AutoMigrate(&Booking{})
	database.AutoMigrate(&Borrow{})
	database.AutoMigrate(&Building{})
	database.AutoMigrate(&Company{})
	database.AutoMigrate(&Device{})
	database.AutoMigrate(&DeviceType{})
	database.AutoMigrate(&Brand{})
	database.AutoMigrate(&Food_and_Drink{})
	database.AutoMigrate(&Foodtype{})
	database.AutoMigrate(&Shop{})
	database.AutoMigrate(&Guard{})
	database.AutoMigrate(&Objective{})
	database.AutoMigrate(&Order_Food{})
	database.AutoMigrate(&Payback{})
	database.AutoMigrate(&Room{})
	database.AutoMigrate(&StatusBook{})
	database.AutoMigrate(&Typeroom{})
	database.AutoMigrate(&User{})
	database.AutoMigrate(&Role{})
	database.AutoMigrate(&Gender{})
	database.AutoMigrate(&EducationLevel{})

	db = database

	password, _ := bcrypt.GenerateFromPassword([]byte("123456"), 14)

	db.Model(&Role{}).Create(&Role{Name: "User"})
	db.Model(&Role{}).Create(&Role{Name: "Admin"})
	db.Model(&Gender{}).Create(&Gender{Name: "Male"})
	db.Model(&Gender{}).Create(&Gender{Name: "Female"})
	var r_user, r_admin Role
	db.Raw("SELECT * FROM roles WHERE name = ?", "User").Scan(&r_user)
	db.Raw("SELECT * FROM roles WHERE name = ?", "Admin").Scan(&r_admin)

	var male, female Gender
	db.Raw("SELECT * FROM genders WHERE name = ?", "Male").Scan(&male)
	db.Raw("SELECT * FROM genders WHERE name = ?", "Female").Scan(&female)

	db.Model(&EducationLevel{}).Create(&EducationLevel{Name: "ปริญญาเอก"})
	db.Model(&EducationLevel{}).Create(&EducationLevel{Name: "ปริญญาโท"})
	db.Model(&EducationLevel{}).Create(&EducationLevel{Name: "ปริญญาตรี"})
	var e1, e2, e3 EducationLevel
	db.Raw("SELECT * FROM education_levels WHERE Name = ?", "ปริญญาเอก").Scan(&e1)
	db.Raw("SELECT * FROM education_levels WHERE Name = ?", "ปริญญาโท").Scan(&e2)
	db.Raw("SELECT * FROM education_levels WHERE Name = ?", "ปริญญาตรี").Scan(&e3)

	db.Model(&User{}).Create(&User{
		FirstName: "A", LastName: "B",
		Email: "test@gmail.com", PhoneNumber: "123456",
		IdentificationNumber: "123456", StudentID: "123456",
		Age: 21, Password: string(password),
		Role: r_user, Gender: male, EducationLevel: e3,
	})
	var u1 User
	db.Raw("SELECT * FROM users WHERE Email = ?", "test@gmail.com").Scan(&u1)

	db.Model(&User{}).Create(&User{
		FirstName: "C", LastName: "D",
		Email: "CD@gmail.com", 
		Age: 50, Password: string(password),
		Role: r_admin, Gender: male, EducationLevel: e3,
	})
	var u2 User
	db.Raw("SELECT * FROM users WHERE Email = ?", "CD@gmail.com").Scan(&u2)

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


	db.Model(&Brand{}).Create(&Brand{BrandDetail: "FlashL"})
	db.Model(&Brand{}).Create(&Brand{BrandDetail: "TripleA"})
	db.Model(&Brand{}).Create(&Brand{BrandDetail: "Lazerz"})
	db.Model(&Brand{}).Create(&Brand{BrandDetail: "penrai"})
	db.Model(&Brand{}).Create(&Brand{BrandDetail: "pensri"})
	var brand1, brand2, brand3,brand4,brand5 Brand
	db.Raw("SELECT * FROM brands WHERE brand_detail = ?", "FlashL").Scan(&brand1)
	db.Raw("SELECT * FROM brands WHERE brand_detail = ?", "TripleA").Scan(&brand2)
	db.Raw("SELECT * FROM brands WHERE brand_detail = ?", "Lazerz").Scan(&brand3)
	db.Raw("SELECT * FROM brands WHERE brand_detail = ?", "penrai").Scan(&brand4)
	db.Raw("SELECT * FROM brands WHERE brand_detail = ?", "pensri").Scan(&brand5)

	db.Model(&DeviceType{}).Create(&DeviceType{DeviceTypeDetail: "การศึกษา"})
	db.Model(&DeviceType{}).Create(&DeviceType{DeviceTypeDetail: "กีฬา"})
	db.Model(&DeviceType{}).Create(&DeviceType{DeviceTypeDetail: "ความบันเทิง"})
	var devicetype1, devicetype2,devicetype3 DeviceType
	db.Raw("SELECT * FROM device_types WHERE device_type_detail = ?", "การศึกษา").Scan(&devicetype1)
	db.Raw("SELECT * FROM device_types WHERE device_type_detail = ?", "กีฬา").Scan(&devicetype2)
	db.Raw("SELECT * FROM device_types WHERE device_type_detail = ?", "ความบันเทิง").Scan(&devicetype3)

	// db.Model(&Device{}).Create(&Device{StatusDevice: true})
	// db.Model(&Device{}).Create(&Device{StatusDevice: true})
	// var statusdevice1, statusdevice2 Device
	// db.Raw("SELECT * FROM devices WHERE status_device = ?", "true").Scan(&statusdevice1)
	// db.Raw("SELECT * FROM devices WHERE status_device = ?", "true").Scan(&statusdevice2)


	db.Model(&Device{}).Create(&Device{Detail: "ปากกา4",StatusDevice: true , Brand: brand1, DeviceType: devicetype1})
	var device1 Device
	db.Raw("SELECT * FROM devices WHERE detail = ?", "ปากกา4").Scan(&device1)
	db.Model(&Device{}).Create(&Device{Detail: "บอล1",StatusDevice: true , Brand: brand2,DeviceType: devicetype2})
	var device2 Device
	db.Raw("SELECT * FROM devices WHERE detail = ?", "บอล1").Scan(&device2)
	db.Model(&Device{}).Create(&Device{Detail: "ตู้เพลง2", StatusDevice: true ,Brand: brand3,DeviceType: devicetype3})
	var device3 Device
	db.Raw("SELECT * FROM devices WHERE detail = ?", "ตู้เพลง2").Scan(&device3)
	db.Model(&Device{}).Create(&Device{Detail: "ปากกา41", StatusDevice: false ,Brand: brand4,DeviceType: devicetype1})
	var device4 Device
	db.Raw("SELECT * FROM devices WHERE detail = ?", "ปากกา41").Scan(&device4)


	db.Model(&Typeroom{}).Create(&Typeroom{Detail: "ห้องพัดลม"})
	db.Model(&Typeroom{}).Create(&Typeroom{Detail: "ห้องแอร์"})
	var typeroom1, typeroom2 Typeroom
	db.Raw("SELECT * FROM typerooms WHERE detail = ?", "ห้องพัดลม").Scan(&typeroom1)
	db.Raw("SELECT * FROM typerooms WHERE detail = ?", "ห้องแอร์").Scan(&typeroom2)

	db.Model(&Room{}).Create(&Room{
		Admin: u1, Typeroom: typeroom1, Detail: "A4101", Building: building1})
	var r1 Room
	db.Raw("SELECT * FROM rooms WHERE detail = ?", "A4101").Scan(&r1)
	db.Model(&Room{}).Create(&Room{
		Admin: u1, Typeroom: typeroom2, Detail: "A1101", Building: building2})
	var r2 Room
	db.Raw("SELECT * FROM rooms WHERE detail = ?", "B1101").Scan(&r2)

	db.Model(&Shop{}).Create(&Shop{Name: "ร้าน A"})
	db.Model(&Shop{}).Create(&Shop{Name: "ร้าน B"})
	var shop1, shop2 Shop
	db.Raw("SELECT * FROM shops WHERE name = ?", "ร้าน A").Scan(&shop1)
	db.Raw("SELECT * FROM shops WHERE name = ?", "ร้าน B").Scan(&shop2)

	db.Model(&Foodtype{}).Create(&Foodtype{Name: "ประเภท A"})
	db.Model(&Foodtype{}).Create(&Foodtype{Name: "ประเภท B"})
	var foodtype1, foodtype2 Foodtype
	db.Raw("SELECT * FROM foodtypes WHERE name = ?", "ประเภท A").Scan(&foodtype1)
	db.Raw("SELECT * FROM foodtypes WHERE name = ?", "ประเภท B").Scan(&foodtype2)

	db.Model(&Food_and_Drink{}).Create(&Food_and_Drink{Menu: "น้ำเปล่า",Foodtype: foodtype1 , Shop: shop1, Admin: u2})
	var food_and_drink1 Food_and_Drink
	db.Raw("SELECT * FROM food_and_drinks WHERE menu = ?", "น้ำเปล่า").Scan(&food_and_drink1)

	// t1, _ := time.Parse(time.RFC3339, "2023-01-30T14:00:00+07:00")
	// t2, _ := time.Parse(time.RFC3339, "2023-01-30T16:00:00+07:00")
	// db.Model(&Booking{}).Create(&Booking{
	// 	Date_Start: t1, Date_End: t2,
	// 	User: u1, Room: r2, Objective: obj2,
	// })

}
