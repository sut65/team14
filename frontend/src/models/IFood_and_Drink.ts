import { UsersInterface } from "./IUser";

export interface Food_and_DrinksInterface {
    ID?: number,
    Name?: string;
    Foodtype?: FoodtypesInterface;
    FoodtypeID?: number;
    Shop?: ShopsInterface;
    ShopID?: number;
}

export interface FoodtypesInterface {
    ID?: number,
    Name?: string;
}

export interface ShopsInterface {
    ID?: number,
    Name?: string;
}