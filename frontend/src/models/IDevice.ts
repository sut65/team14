import { DeviceTypesInterface } from "./IDeviceType";
import { BrandsInterface } from "./IBrand";

export interface DevicesInterface {
    ID?: string,

    Detail?: string,
    Number_of_Device?: number,
    Note?: string, 
    StatusDevice?: boolean,

    DeviceTypeID?: string | null,
    BrandID?: string | null,

    DeviceType?: DeviceTypesInterface
    Brand?: BrandsInterface
}