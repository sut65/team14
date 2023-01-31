import { ApprovesInterface } from "./IApprove";
import { ObjectivesInterface } from "./IObjective";
import { RoomsInterface } from "./IRoom";
import { UsersInterface } from "./IUser";

export interface BookingsInterface {
    ID?: string,
    DeletedAt?: Date| null,
    
    Code?: string,
    Date_Start?: Date | null;
    Date_End?: Date | null;

    UserID?: string | null;
    ObjectiveID?: string | null;
    RoomID?: string | null;

    User?: UsersInterface;
    Objective?: ObjectivesInterface;
    Room?: RoomsInterface;

    Approve? : ApprovesInterface;
}