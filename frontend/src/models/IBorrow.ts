import { DevicesInterface } from "./IDevice";
import { BookingsInterface } from "./IBooking";
import { UsersInterface } from "./IUser";

export interface BorrowsInterface {
    ID?: string,
    Timeofborrow: Date | null;

    UserID?: string | null;
    DeviceID?: string | null;
    BookingID?: string | null;

    User?: UsersInterface;
    Device?: DevicesInterface;
    Booking?: BookingsInterface;
}