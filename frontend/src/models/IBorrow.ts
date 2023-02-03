import { DevicesInterface } from "./IDevice";
import { ApprovesInterface } from "./IApprove";
import { UsersInterface } from "./IUser";
import { DeviceTypesInterface } from "./IDeviceType";
import { PaybacksInterface } from "./IPayback";

export interface BorrowsInterface {
    ID?: string,
    Timeofborrow: Date | null;
    BorrowNote1: string | null;
    BorrowAPNote: string |null;

    AdminID?: string | null;
    DeviceID?: string | null;
    //DeviceTypeID?: string | null;
    ApproveID?: string | null;

    Admin?: UsersInterface;
    Device?: DevicesInterface;
    Approve?: ApprovesInterface;

    Payback?: PaybacksInterface;
    //change user to admin & booking to approve
}