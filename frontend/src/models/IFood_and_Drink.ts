import { UsersInterface } from "./IUser";

export interface Food_and_DrinksInterface {
    ID?: number,
    Menu?: string | null;
    Foodtype?: FoodtypesInterface ;
    FoodtypeID?: string | null;
    Shop?: ShopsInterface;
    ShopID?: string | null;
    Admin?: string | null;
}

export interface FoodtypesInterface {
    ID?: number,
    Name?: string;
}

export interface ShopsInterface {
    ID?: number,
    Name?: string;
}
