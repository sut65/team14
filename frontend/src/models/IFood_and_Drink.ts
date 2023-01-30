import { UsersInterface } from "./IUser";

export interface Food_and_DrinksInterface {
    ID?: number,
    Menu?: string;
    Foodtype?: FoodtypesInterface;
    FoodtypeID?: string;
    Shop?: ShopsInterface;
    ShopID?: string;
    Admin?: string;
}

export interface FoodtypesInterface {
    ID?: number,
    Name?: string;
}

export interface ShopsInterface {
    ID?: number,
    Name?: string;
}
