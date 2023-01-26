import { DeviceTypesInterface } from "./IDeviceType";
import { BrandsInterface } from "./IBrand";

export interface DevicesInterface {
    ID?: string,

    Detail?: string, 
    StatusDevice?: boolean,

    DeviceTypeID?: string | null,
    BrandID?: string | null,

    DeviceType?: DeviceTypesInterface
    BrandType?: BrandsInterface
}