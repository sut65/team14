import { RoomsInterface } from "./IRoom";
import { GuardsInterface } from "./IGuard";
import { CompaniesInterface } from "./ICompany";
import { UsersInterface } from "./IUser";

export interface BuildingsInterface {
    ID?: string,

    Detail?: string,

    AdminID?: string;
    RoomID?: string;
    CompanyID?: string;
    GuardID?: string;
    Note?: string | "";
    Time?: Date | null;

    Admin?: UsersInterface
    Room?: RoomsInterface
    Company?: CompaniesInterface
    Guard?: GuardsInterface

    
}