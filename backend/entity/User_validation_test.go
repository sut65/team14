package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestUserPass(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูลถูกต้องหมดทุก field
	user := User{
		FirstName:            "bbb",
		LastName:             "ccc",
		Email:                "bbb@gmail.com",
		PhoneNumber:          "1234567890",
		IdentificationNumber: "1234567890123",
		StudentID:            "B1234567",
		Age:                  20,
		Password:             "123456",
		BirthDay:             time.Now().AddDate(2002, 04, 20),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(user)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	// err ต้องเป็น nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())
}

func TestUserFirstNameNull(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูล ไม่ถูกต้องตาม Format
	user := User{
		FirstName:            "",
		LastName:             "ccc",
		Email:                "bbb@gmail.com",
		PhoneNumber:          "0555555555",
		IdentificationNumber: "1234567890123",
		StudentID:            "B6245854",
		Age:                  20,
		Password:             "123456",
		BirthDay:             time.Now().AddDate(2002, 04, 20),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(user)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกชื่อ"))
}

func TestUserLastNameNull(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูล ไม่ถูกต้องตาม Format
	user := User{
		FirstName:            "bbb",
		LastName:             "",
		Email:                "bbb@gmail.com",
		PhoneNumber:          "0555555555",
		IdentificationNumber: "1234567890123",
		StudentID:            "B6245854",
		Age:                  20,
		Password:             "123456",
		BirthDay:             time.Now().AddDate(2002, 04, 20),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(user)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกนามสกุล"))
}

func TestUserEmail(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูล ไม่ถูกต้องตาม Format
	user := User{
		FirstName:            "bbb",
		LastName:             "ccc",
		Email:                "bbb",
		PhoneNumber:          "0555555555",
		IdentificationNumber: "1234567890123",
		StudentID:            "B6245854",
		Age:                  20,
		Password:             "123456",
		BirthDay:             time.Now().AddDate(2002, 04, 20),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(user)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Email: bbb does not validate as email"))
}

func TestUserEmailNull(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูล ไม่ถูกต้องตาม Format
	user := User{
		FirstName:            "bbb",
		LastName:             "ccc",
		Email:                "",
		PhoneNumber:          "0555555555",
		IdentificationNumber: "1234567890123",
		StudentID:            "B6245854",
		Age:                  20,
		Password:             "123456",
		BirthDay:             time.Now().AddDate(2002, 04, 20),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(user)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Email: กรุณากรอกอีเมลล์"))
}

func TestUserPhonenumber(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูล ไม่ถูกต้องตาม Format
	user := User{
		FirstName:            "bbb",
		LastName:             "ccc",
		Email:                "bbb@gmail.com",
		PhoneNumber:          "055555555",
		IdentificationNumber: "1234567890123",
		StudentID:            "B6245854",
		Age:                  20,
		Password:             "123456",
		BirthDay:             time.Now().AddDate(2002, 04, 20),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(user)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("เบอร์โทรศัพท์ต้องมีตัวเลข 10 หลัก"))
}

func TestUserPhonenumberNull(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูล ไม่ถูกต้องตาม Format
	user := User{
		FirstName:            "bbb",
		LastName:             "ccc",
		Email:                "bbb@gmail.com",
		PhoneNumber:          "",
		IdentificationNumber: "1234567890123",
		StudentID:            "B6245854",
		Age:                  20,
		Password:             "123456",
		BirthDay:             time.Now().AddDate(2002, 04, 20),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(user)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกเบอร์โทรศัพท์"))
}

func TestUserIdentificationNumber(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูล ไม่ถูกต้องตาม Format
	user := User{
		FirstName:            "bbb",
		LastName:             "ccc",
		Email:                "bbb@gmail.com",
		PhoneNumber:          "0555555555",
		IdentificationNumber: "123456789012",
		StudentID:            "B6245854",
		Age:                  20,
		Password:             "123456",
		BirthDay:             time.Now().AddDate(2002, 04, 20),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(user)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("เลขบัตรประชาชนต้องมีตัวเลข 13 หลัก"))
}

func TestUserIdentificationNumberNull(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูล ไม่ถูกต้องตาม Format
	user := User{
		FirstName:            "bbb",
		LastName:             "ccc",
		Email:                "bbb@gmail.com",
		PhoneNumber:          "0555555555",
		IdentificationNumber: "",
		StudentID:            "B6245854",
		Age:                  20,
		Password:             "123456",
		BirthDay:             time.Now().AddDate(2002, 04, 20),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(user)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกเลขบัตรประชาชน"))
}

func TestUserStudentID(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูล ไม่ถูกต้องตาม Format
	user := User{
		FirstName:            "bbb",
		LastName:             "ccc",
		Email:                "bbb@gmail.com",
		PhoneNumber:          "0555555555",
		IdentificationNumber: "1234567890123",
		StudentID:            "B123456",
		Age:                  20,
		Password:             "123456",
		BirthDay:             time.Now().AddDate(2002, 04, 20),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(user)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("รหัสนักศึกษาต้องขึ้นต้นด้วย B ตามด้วยตัวเลข 7 หลัก"))
}

func TestUserStudentIDNull(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูล ไม่ถูกต้องตาม Format
	user := User{
		FirstName:            "bbb",
		LastName:             "ccc",
		Email:                "bbb@gmail.com",
		PhoneNumber:          "0555555555",
		IdentificationNumber: "1234567890123",
		StudentID:            "",
		Age:                  20,
		Password:             "123456",
		BirthDay:             time.Now().AddDate(2002, 04, 20),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(user)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกรหัสนักศึกษา"))
}

func TestAge(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูล ไม่ถูกต้องตาม Format
	user := User{
		FirstName:            "bbb",
		LastName:             "ccc",
		Email:                "bbb@gmail.com",
		PhoneNumber:          "0555555555",
		IdentificationNumber: "1234567890123",
		StudentID:            "B1234567",
		Age:                  17,
		Password:             "123456",
		BirthDay:             time.Now().AddDate(2002, 04, 20),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(user)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("อายุไม่ต่ำกว่า 18"))
}

func TestPassword(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูล ไม่ถูกต้องตาม Format
	user := User{
		FirstName:            "bbb",
		LastName:             "ccc",
		Email:                "bbb@gmail.com",
		PhoneNumber:          "0555555555",
		IdentificationNumber: "1234567890123",
		StudentID:            "B1234567",
		Age:                  20,
		Password:             "123",
		BirthDay:             time.Now().AddDate(2002, 04, 20),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(user)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Password: 123 does not validate as minstringlength(6)"))
}

func TestPasswordNull(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูล ไม่ถูกต้องตาม Format
	user := User{
		FirstName:            "bbb",
		LastName:             "ccc",
		Email:                "bbb@gmail.com",
		PhoneNumber:          "0555555555",
		IdentificationNumber: "1234567890123",
		StudentID:            "B1234567",
		Age:                  20,
		Password:             "",
		BirthDay:             time.Now().AddDate(2002, 04, 20),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(user)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกรหัสผ่าน"))
}

