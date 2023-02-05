package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)


func TestOrderPass(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูลถูกต้องหมดทุก field
	order := Order_Food{
		Totold: 1,
		Note:        "test",     // Not Null
		OrderTime: time.Now(), // เป็นปัจจุบัน +- 3 นาที
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(order)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	// err ต้องเป็น nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())
}

func TestOrder_Totold(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูล Note เป็น Null
	order:= Order_Food{	
		Totold: 1001,	
		Note:        "test",
		OrderTime: time.Now(), // เป็นปัจจุบัน +- 3 นาที
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(order)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).NotTo(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("เลขไม่ถูกต้อง"))
}

func TestOrderNote_Null(t *testing.T) {
	g := NewGomegaWithT(t)

	order := Order_Food{
		Totold: 1,
		Note:        "",     // Not Null
		OrderTime: time.Now(), // เป็นปัจจุบัน +- 3 นาที
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(order)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).NotTo(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกหมายเหตุ"))
}


func TestOrder_Time(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูล Note เป็น Null
	order:= Order_Food{	
		Totold: 1,	
		Note:        "test",
		OrderTime: time.Date(2000, 1, 26, 0, 0, 0, 0, time.UTC), // เป็นอดีต
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(order)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("เวลาไม่ถูกต้อง"))
}