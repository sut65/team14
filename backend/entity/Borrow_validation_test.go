package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestBorrowPass(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูลถูกต้องหมดทุก field
	borrow := Borrow{
		BorrowNote1:  "ssss",
		BorrowAPNote: "ฟฟฟฟฟ",
		Timeofborrow: time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(borrow)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	// err ต้องเป็น nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())
}

func TestBorrowAPNote_Null(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูล Code ไม่ถูกต้องตาม Format
	borrow := Borrow{
		BorrowNote1:  "sssss",
		BorrowAPNote: "", //null
		Timeofborrow: time.Now().Add(22 * time.Hour),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(borrow)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกหมายเหตุจากผู้บันทึก"))
}

func TestBorrowNote1_Null(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูล Note เป็น Null
	borrow := Borrow{
		BorrowAPNote: "ฟฟฟฟฟฟฟ",
		BorrowNote1:  "",
		Timeofborrow: time.Now().Add(22 * time.Hour),

		// Code:        "Ap12345",
		// Note:        "", // null
		// ApproveTime: time.Now().Add(22 * time.Hour),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(borrow)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกหมายเหตุจากผู้ยืม"))
}

func TestBorrow_Time(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูล Note เป็น Null
	borrow := Borrow{
		BorrowNote1:  "sssss",
		BorrowAPNote: "Ap12345",
		Timeofborrow: time.Date(2000, 1, 26, 0, 0, 0, 0, time.UTC), // เป็นอดีต
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(borrow)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("เวลาไม่ใช่ปัจจุปัน"))
}
