export interface UsersInterface {
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

export interface RolesInterface {
    ID?: number,
    Name?: string;
}

export interface GendersInterface {
    ID?: number,
    Name?: string;
}

export interface EducationLevelsInterface {
    ID?: number,
    Name?: string;
}