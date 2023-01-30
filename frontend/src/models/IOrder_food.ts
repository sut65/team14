import { UsersInterface } from "./IUser";
import { Food_and_DrinksInterface } from "./IFood_and_Drink";
import { ApprovesInterface } from "./IApprove";

export interface Order_foodInterface {
    ID?: string, 

    Food_and_DrinkID?: string | null;
    ApproveID?: string | null;
    AdminID?: string | null;

    Totold?: string | null,

    Food_and_Drink?: Food_and_DrinksInterface;
    Approve?: ApprovesInterface;
    Admin?: UsersInterface;
}