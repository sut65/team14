export interface UsersInterface {
    ID?: string,
    FirstName?: string;
    LastName?: string;
    Email?: string;
    PhoneNumber?: string;
    IdentificationNumber?: string;
	StudentID?: string;
    Age?: number;
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