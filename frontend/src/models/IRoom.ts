import { BuildingsInterface } from "./IBuilding";
import { TyperoomsInterface } from "./ITyperoom";
import { UsersInterface } from "./IUser";

export interface RoomsInterface {
    ID?: string,

    UserID?: string | null;
    BuildingID?: string | null;
    TyperoomID?: string | null;
    Note?: string | "";
    Time?: Date | null;

    Detail?: string,
    
    User?: UsersInterface
    Building?: BuildingsInterface;
    Typeroom?: TyperoomsInterface;
}