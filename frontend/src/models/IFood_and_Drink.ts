import { UsersInterface } from "./IUser";

export interface Food_and_DrinksInterface {
    ID?: number,
    Menu?: string;
    Foodtype?: FoodtypesInterface;
    FoodtypeID?: number;
    Shop?: ShopsInterface;
    ShopID?: number;
    Admin?: UsersInterface;
}

export interface FoodtypesInterface {
    ID?: number,
    Name?: string;
}

export interface ShopsInterface {
    ID?: number,
    Name?: string;
}
