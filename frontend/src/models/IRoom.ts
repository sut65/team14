import { BuildingsInterface } from "./IBuilding";

export interface RoomsInterface {
    ID?: string,

    Detail?: string,

    BuildingID?: string,
    
    Building?: BuildingsInterface;
}