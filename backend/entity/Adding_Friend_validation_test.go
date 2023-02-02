package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)


func TestAddfreindPass(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูลถูกต้องหมดทุก field
	add_friend := Adding_Friend{
		
		Note:        "test",     // Not Null
		AddfriendTime: time.Now(), // เป็นปัจจุบัน +- 3 นาที
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(add_friend)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	// err ต้องเป็น nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())
}


func TestAddfriendNote_Null(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูล Note เป็น Null
	add_friend := Adding_Friend{		
		Note:        "", // null
		AddfriendTime: time.Now().Add(22 * time.Hour),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(add_friend)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกหมายเหตุ"))
}


func TestAddfriend_Time(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูล Note เป็น Null
	add_friend:= Adding_Friend{		
		Note:        "test",
		AddfriendTime: time.Date(2000, 1, 26, 0, 0, 0, 0, time.UTC), // เป็นอดีต
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(add_friend)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("เวลาไม่ถูกต้อง"))
}