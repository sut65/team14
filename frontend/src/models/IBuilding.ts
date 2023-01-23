import { RoomsInterface } from "./IRoom";
import { GuardsInterface } from "./IGuard";
import { CompaniesInterface } from "./ICompany";
import { UsersInterface } from "./IUser";

export interface BuildingsInterface {
    ID?: string,

    Detail?: string,

    UserID?: string | null;
    RoomID?: string | null;
    CompanyID?: string | null;
    GuardID?: string | null;

    User?: UsersInterface
    Room?: RoomsInterface
    Company?: CompaniesInterface
    Guard?: GuardsInterface

}