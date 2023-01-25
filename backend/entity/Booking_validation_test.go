package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestBookingPass(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูลถูกต้องหมดทุก field
	booking := Booking{
		Code:       "Bk12345",                      // format: Bk + ตัวเลข 5 ตัว
		Date_Start: time.Now().Add(22 * time.Hour), // เป็นอนาคต
		Date_End:   time.Now().Add(24 * time.Hour), // เป็นอนาคต
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(booking)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	// err ต้องเป็น nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())
}

func TestBookingCode_Format(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูล Code ผิด
	booking := Booking{
		Code:       "B12345", // format fail
		Date_Start: time.Now().Add(22 * time.Hour),
		Date_End:   time.Now().Add(24 * time.Hour),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(booking)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("รหัสการจอง ต้องขึ้นต้นด้วย Bk ตามด้วยตัวเลข 5 หลัก"))
}

func TestBookingCode_Null(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูล Code ผิด
	booking := Booking{
		Code:       "", // format fail
		Date_Start: time.Now().Add(22 * time.Hour),
		Date_End:   time.Now().Add(24 * time.Hour),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(booking)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกรหัสการจอง"))
}

func TestBookingDate_StartMustBeFuture(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูล Date_Start ผิด
	booking := Booking{
		Code:       "Bk12345",
		Date_Start: time.Date(2000, 1, 26, 0, 0, 0, 0, time.UTC), // เป็นอดีต fail
		Date_End:   time.Now().Add(24 * time.Hour),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(booking)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณาเลือกเวลาที่เริ่มต้นการจองล่วงหน้า"))
}

func TestBookingDate_EndMustBeFuture(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูล Date_End ผิด
	booking := Booking{
		Code:       "Bk12345",
		Date_Start: time.Now().Add(24 * time.Hour),
		Date_End:   time.Date(2000, 1, 26, 0, 0, 0, 0, time.UTC), // เป็นอดีต fail
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(booking)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณาเลือกเวลาที่สิ้นสุดการจองล่วงหน้า"))
}
