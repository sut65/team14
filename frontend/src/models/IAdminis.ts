import { RolesInterface } from "./IUser";
import { GendersInterface } from "./IUser";
import { EducationLevelsInterface } from "./IUser";

export interface AdminissInterface {
    ID?: string ,
    FirstName?: string | null;
    LastName?: string | null;
    Email?: string | null;
    PhoneNumber?: string | null;
    IdentificationNumber?: string | null;
	StudentID?: string | null;
    Age?: number | null;
    Password?: string;
    BirthDay?: Date | null;

    EducationLevelID?: number;
    RoleID?: number;
    GenderID?: number;

    Role?: RolesInterface;
    Gender?: GendersInterface;
    EducationLevel?: EducationLevelsInterface

}