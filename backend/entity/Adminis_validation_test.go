package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestAdminisPass(t *testing.T) {
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

func TestAdminisFirstNameNull(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูล ไม่ถูกต้องตาม Format
	adminis := User{
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
	ok, err := govalidator.ValidateStruct(adminis)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกชื่อ"))
}

func TestAdminisLastNameNull(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูล ไม่ถูกต้องตาม Format
	adminis := User{
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
	ok, err := govalidator.ValidateStruct(adminis)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกนามสกุล"))
}

func TestAdminisEmail(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูล ไม่ถูกต้องตาม Format
	adminis := User{
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
	ok, err := govalidator.ValidateStruct(adminis)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Email: กรุณากรอกอีเมลให้ถูกต้อง"))
}

func TestAdminisEmailNull(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูล ไม่ถูกต้องตาม Format
	adminis := User{
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
	ok, err := govalidator.ValidateStruct(adminis)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Email: กรุณากรอกอีเมล"))
}

func TestAdminisPhonenumber(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูล ไม่ถูกต้องตาม Format
	adminis := User{
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
	ok, err := govalidator.ValidateStruct(adminis)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("เบอร์โทรศัพท์ต้องมีตัวเลข 10 หลัก"))
}

func TestAdminisPhonenumberNull(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูล ไม่ถูกต้องตาม Format
	adminis := User{
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
	ok, err := govalidator.ValidateStruct(adminis)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกเบอร์โทรศัพท์"))
}

func TestAdminisIdentificationNumber(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูล ไม่ถูกต้องตาม Format
	adminis := User{
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
	ok, err := govalidator.ValidateStruct(adminis)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("เลขบัตรประชาชนต้องมีตัวเลข 13 หลัก"))
}

func TestAdminisIdentificationNumberNull(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูล ไม่ถูกต้องตาม Format
	adminis := User{
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
	ok, err := govalidator.ValidateStruct(adminis)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกเลขบัตรประชาชน"))
}

func TestAdminisStudentID(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูล StudentID ไม่ถูกต้องตาม Format
	adminis := User{
		FirstName:            "bbb",
		LastName:             "ccc",
		Email:                "bbb@gmail.com",
		PhoneNumber:          "0555555555",
		IdentificationNumber: "1234567890123",
		StudentID:            "M123456",
		Age:                  20,
		Password:             "123456",
		BirthDay:             time.Now().AddDate(2002, 04, 20),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(adminis)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("รหัสนักศึกษาต้องขึ้นต้นด้วย B หรือ M หรือ D ตามด้วยตัวเลข 7 หลัก"))
}

func TestAdminisStudentIDNull(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูล ไม่ถูกต้องตาม Format
	adminis := User{
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
	ok, err := govalidator.ValidateStruct(adminis)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกรหัสนักศึกษา"))
}

func TestAdminisAge(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูล ไม่ถูกต้องตาม Format
	adminis := User{
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
	ok, err := govalidator.ValidateStruct(adminis)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("อายุไม่ต่ำกว่า 18"))
}

func TestAdminisPassword(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูล ไม่ถูกต้องตาม Format
	adminis := User{
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
	ok, err := govalidator.ValidateStruct(adminis)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("รหัสผ่านต้องมีจำนวนอย่างน้อย 6 ตัว"))
}

func TestAdminisPasswordNull(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูล ไม่ถูกต้องตาม Format
	adminis := User{
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
	ok, err := govalidator.ValidateStruct(adminis)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกรหัสผ่าน"))
}

