import { DevicesInterface } from "./IDevice";
import { BorrowsInterface } from "./IBorrow";
import { UsersInterface } from "./IUser";

export interface PaybacksInterface {
    ID?: string,
    Timeofpayback?: Date | null;
    PBADNote?: string | null;
    PBusNote?: string | null;

    AdminID?: string | null;
    DeviceID?: string | null;
    BorrowID?: string | null;

    Admin?: UsersInterface;
    Device?: DevicesInterface;
    Borrow?: BorrowsInterface;

}