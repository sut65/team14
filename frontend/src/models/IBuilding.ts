import { RoomsInterface } from "./IRoom";
import { GuardsInterface } from "./IGuard";
import { CompaniesInterface } from "./ICompany";
import { UsersInterface } from "./IUser";

export interface BuildingsInterface {
    ID?: string,

    Detail?: string,

    UserID?: string;
    RoomID?: string;
    CompanyID?: string;
    GuardID?: string;
    Note?: string | "";
    Time?: Date | null;

    User?: UsersInterface
    Room?: RoomsInterface
    Company?: CompaniesInterface
    Guard?: GuardsInterface

    
}