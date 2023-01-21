import { DevicesInterface } from "./IDevice";
import { BookingsInterface } from "./IBooking";
import { UsersInterface } from "./IUser";

export interface BorrowsInterface {
    ID?: string,
    Timeofborrow: Date | null;

    Admin?: string | null;
    DeviceID?: string | null;
    BookingID?: string | null;

    User?: UsersInterface;
    Device?: DevicesInterface;
    Booking?: BookingsInterface;

    //change user to admin & booking to approve
}