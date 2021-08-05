import { ICartItem } from "./ICartItem";

export interface ICart {
    id: number | null;
    items: ICartItem[];
}