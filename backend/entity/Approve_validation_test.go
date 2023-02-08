package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestApprovePass(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูลถูกต้องหมดทุก field
	approve := Approve{
		Code:        "Ap12345",  // format: Ap + ตัวเลข5ตัว
		Note:        "test",     // Not Null
		ApproveTime: time.Now(), // เป็นปัจจุบัน +- 3 นาที
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(approve)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	// err ต้องเป็น nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())
}

func TestApproveCode_Format(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูล Code ไม่ถูกต้องตาม Format
	approve := Approve{
		Code:        "12345", // format is A ตามด้วยตัวเลข 5 ตัว
		Note:        "test",
		ApproveTime: time.Now().Add(1 + time.Minute),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(approve)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("รหัสการอนุมัติ ต้องขึ้นต้นด้วย Ap ตามด้วยตัวเลข 5 หลัก"))
}

func TestApproveCode_Null(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูล Code ไม่ถูกต้องตาม Format
	approve := Approve{
		Code:        "", // Null
		Note:        "test",
		ApproveTime: time.Now().Add(-1 * time.Minute),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(approve)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกรหัสการอนุมัติ"))
}

func TestApproveNote_Null(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูล Note เป็น Null
	approve := Approve{
		Code:        "Ap12345",
		Note:        "", // null
		ApproveTime: time.Now().Add(2 + time.Minute),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(approve)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกหมายเหตุ"))
}

func TestApprove_Time(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูล Note เป็น Null
	approve := Approve{
		Code:        "Ap12345",
		Note:        "test",
		ApproveTime: time.Date(2000, 1, 26, 0, 0, 0, 0, time.UTC), // เป็นอดีต
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(approve)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("เวลาที่อนุมัติไม่ถูกต้อง"))
}
