import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ICart } from 'src/interfaces/ICart';
import { ICartItem } from 'src/interfaces/ICartItem';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    $cart: BehaviorSubject<ICart>;

    constructor(private http: HttpClient, private userService: UserService) {
        this.$cart = new BehaviorSubject<ICart>(this.getEmptyCart());
    }

    getEmptyCart(): ICart {
        return {
            id: null,
            products: []
        };
    }

    loadCart(userId: number) {
        this.http.get<ICart>(`http://localhost:8080/carts/${userId}`).subscribe((cart: ICart) => {
            this.$cart.next(cart);
        });
    }


    saveCart() {
        let user = this.userService.$currentUser.getValue();
        if (user) {
            this.http.post<ICart>(`http://localhost:8080/carts/${user.id}`, this.$cart.getValue());
        } else {
            // save to cookies
        }
    }

    clearCart() {
        let user = this.userService.$currentUser.getValue();
        if (user) {
            this.$cart.next({ id: user.id, products: [] });
        }
    }

    addItem(productId: number, quantity: number) {

        let cart = this.$cart.getValue();

        let processed = false;
        cart.products.forEach((i: ICartItem) => {
            if (i.id === productId) {
                i.quantity += quantity;
                processed = true;
            }
        });
        if (!processed) {
            cart.products.push({
                id: productId,
                quantity: quantity
            });
        }

        this.$cart.next(cart);
    }

    removeItem(productId: number, quantity: number) {
        let cart = this.$cart.getValue();
        cart.products.forEach((i: ICartItem) => {
            if (i.id === productId) {
                i.quantity -= quantity;
            }
        });
        cart.products = cart.products.filter((i: ICartItem) => {
            return i.quantity > 0;
        });
    }

    // only when logging in from anonymous state
    // if already logged in, do not merge - clear cart
    mergeCart(newCart: ICart) {
        let cart = this.$cart.getValue();
        cart.products.forEach((i: ICartItem) => {
            let item = newCart.products.find((j: ICartItem) => {
                return (j.id === i.id);
            });
            if (item !== undefined) {
                i.quantity += item.quantity;
            } else {
                cart.products.push({
                    id: i.id,
                    quantity: i.quantity
                });
            }
        });

        this.$cart.next(cart);
    }
}
