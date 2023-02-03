package entity

import (
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestFood_and_DrinkPass(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูลถูกต้องหมดทุก field
	food_and_drink := Food_and_Drink{
		Menu: "ขนมปัง",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(food_and_drink)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	// err ต้องเป็น nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())
}

func TestFood_and_DrinkNull(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูล Code ไม่ถูกต้องตาม Format
	food_and_drink := Food_and_Drink{
		Menu: "",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(food_and_drink)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกชื่ออาหารและเครื่องดื่ม"))
}
