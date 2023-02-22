package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)


func TestRoomPass(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูลถูกต้องหมดทุก field
	room := Room{

		Note:       "5555",
		Detail:     "A555",     // Not Null
		Time:       time.Now(), // เป็นปัจจุบัน +- 3 นาที
		BuildingID: new(uint),
		Building:   Building{},
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(room)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	// err ต้องเป็น nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())
}

func TestRoomNote_Null(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูล Note เป็น Null
	room := Room{
		Note:       "",
		Detail:     "A555",     // Not Null
		Time:       time.Now(), // เป็นปัจจุบัน +- 3 นาที
		BuildingID: new(uint),
		Building:   Building{},
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(room)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกหมายเหตุ"))
}

func TestRoomDetail_Null(t *testing.T) {
	g := NewGomegaWithT(t)
	// ข้อมูล Note เป็น Null
	room := Room{
		Note:       "5555",
		Detail:     "",         // Not Null
		Time:       time.Now(), // เป็นปัจจุบัน +- 3 นาที
		BuildingID: new(uint),
		Building:   Building{},
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(room)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกเลขห้อง"))
}
func TestRoom_Time(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูล Note เป็น Null
	room := Room{
		Note:       "5555",
		Detail:     "555",                                        // Not Null
		Time:       time.Date(2000, 1, 26, 0, 0, 0, 0, time.UTC), // เป็นอดีต
		BuildingID: new(uint),
		Building:   Building{},
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(room)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("เวลาที่อนุมัติไม่ถูกต้อง"))
}
