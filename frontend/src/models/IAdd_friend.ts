import { UsersInterface } from "./IUser";
import { ApprovesInterface } from "./IApprove";

export interface Add_friendInterface {
    ID?: string, 

    UserID?: string | null;
    ApproveID?: string | null;
    AdminID?: string | null;

    Note?: string | "";
    AddfriendTime?: Date | null;

    User?: UsersInterface;
    Approve?: ApprovesInterface;
    Amin?: UsersInterface;
}