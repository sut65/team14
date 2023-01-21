import { StatusBooksInterface } from "./IStatusBook";
import { BookingsInterface } from "./IBooking";
import { UsersInterface } from "./IUser";

export interface ApprovesInterface {
    ID?: string,

    // ApproveCode?: string | null;

    UserID?: string | null;
    StatusBookID?: string | null;
    BookingID?: string | null;

    User?: UsersInterface;
    StatusBook?: StatusBooksInterface;
    Booking?: BookingsInterface;
}