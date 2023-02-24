import { DeviceTypesInterface } from "./IDeviceType";
import { BrandsInterface } from "./IBrand";
import { UsersInterface } from "./IUser";

export interface DevicesInterface {
    ID?: string,

    Detail?: string,
    Number?: number,
    Note?: string, 
    StatusDevice?: boolean,

    DeviceTypeID?: string | null,
    BrandID?: string | null,
    Admin?: string | null;

    DeviceType?: DeviceTypesInterface
    Brand?: BrandsInterface
}