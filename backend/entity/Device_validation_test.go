package entity

import (
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestDevicePass(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูลทั้งหมดถูกต้องหมดทุก field
	device := Device{
		Detail:           "ยางลบ",
		Number_of_Device: 10,
		Note:             "test",
		StatusDevice:     true,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(device)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	// err ต้องเป็น nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())
}

func TestDeviceDetailNull(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูล Detail ไม่ถูกต้องตาม Format
	device := Device{
		Detail:           "",
		Number_of_Device: 10,
		Note:             "test",
		StatusDevice:     true,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(device)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกชื่ออุปกรณ์"))
}

// func TestStatusDeviceNull(t *testing.T) {
// 	g := NewGomegaWithT(t)

// 	// ข้อมูล Address ไม่ถูกต้องตาม Format
// 	food_and_drink := Food_and_Drink{
// 		Menu: "ขนมปัง",
// 		StatusDevice: ,
// 	}

// 	// ตรวจสอบด้วย govalidator
// 	ok, err := govalidator.ValidateStruct(food_and_drink)

// 	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
// 	g.Expect(ok).ToNot(BeTrue())

// 	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
// 	g.Expect(err).ToNot(BeNil())

// 	// err.Error() ต้องมี message แสดงออกมา
// 	g.Expect(err.Error()).To(Equal("กรุณากรอกที่อยู่"))
// }

// func TestFood_and_DrinkTelNull(t *testing.T) {
// 	g := NewGomegaWithT(t)

// 	// ข้อมูล tel ไม่ถูกต้องตาม Format
// 	food_and_drink := Food_and_Drink{
// 		Menu: "ขนมปัง",
// 		Address: "999/999",
// 		Tel: "",
// 	}

// 	// ตรวจสอบด้วย govalidator
// 	ok, err := govalidator.ValidateStruct(food_and_drink)

// 	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
// 	g.Expect(ok).ToNot(BeTrue())

// 	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
// 	g.Expect(err).ToNot(BeNil())

// 	// err.Error() ต้องมี message แสดงออกมา
// 	g.Expect(err.Error()).To(Equal("กรุณากรอกเบอร์โทรศัพท์"))
// }
