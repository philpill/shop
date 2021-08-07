import { IProduct } from "./IProduct";

export interface IOrder {
    id: number;
    products: {
        id: number;
        detail?: IProduct;
        quantity: number;
    }[];
}