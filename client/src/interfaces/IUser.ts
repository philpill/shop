import { IAddress } from "./IAddress";
import { IOrder } from "./IOrder";

export interface IUser {
    id: number;
    orders: IOrder[];
    name: {
        firstName: string;
        lastName: string;
    };
    phone: string;
    avatar: string;
    email: string;
    address: IAddress;

    role: 'ADMIN' | 'CUSTOMER';
};