import { DevicesInterface } from "./IDevice";
import { ApprovesInterface } from "./IApprove";
import { UsersInterface } from "./IUser";
import { DeviceTypesInterface } from "./IDeviceType";

export interface BorrowsInterface {
    ID?: string,
    Timeofborrow: Date | null;

    Admin?: string | null;
    DeviceID?: string | null;
    DeviceTypeID?: string | null;
    ApproveID?: string | null;

    User?: UsersInterface;
    Device?: DevicesInterface;
    Approve?: ApprovesInterface;

    //change user to admin & booking to approve
}