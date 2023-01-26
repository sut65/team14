import { DeviceTypesInterface } from "./IDeviceType";
import { BraandsInterface } from "./IBrand";

export interface DevicesInterface {
    ID?: string,

    Detail?: string, 
    StatusDevice?: boolean,

    DeviceTypeID?: string | null,
    BrandID?: string | null,

    DeviceType?: DeviceTypesInterface
    BrandType?: BraandsInterface
}