import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICart } from 'src/interfaces/ICart';
import { ICartItem } from 'src/interfaces/ICartItem';
import { identifierModuleUrl } from '@angular/compiler';
import { UserService } from './user.service';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    private cart: ICart;

    constructor(private http: HttpClient, private userService: UserService) {
        this.cart = {
            id: null,
            items: []
        };
    }

    getCart(): Observable<ICart> {
        let user = this.userService.getCurrentUser();
        if (user) {
            return this.http.get<ICart>(`http://localhost:8080/carts/ ${ user.id }`);
        } else {
            return of(this.cart);
        }        
    }

    saveCart() {
        let user = this.userService.getCurrentUser();
        if (user) {
            this.http.post<ICart>(`http://localhost:8080/carts/ ${ user.id }`, this.cart);
        } else {
            // save to cookies
        }  
    }

    clearCart() {
        this.cart.items = [];
        let user = this.userService.getCurrentUser();
        if (user) {
            this.http.delete(`http://localhost:8080/carts/ ${ user.id }`);
        } else {
            // clear cart cookie values
        }
    }

    addItem(productId: number, quantity: number) {
        let processed = false;
        this.cart.items.forEach((i: ICartItem) => {
            if (i.id === productId) {
                i.quantity += quantity;
                processed = true;
            }
        });
        if (!processed) {
            this.cart.items.push({
                id: productId,
                quantity: quantity
            });
        }
    }

    removeItem(productId: number, quantity: number) {
        this.cart.items.forEach((i: ICartItem) => {
            if (i.id === productId) {
                i.quantity -= quantity;
            }
        });
        this.cart.items = this.cart.items.filter((i: ICartItem) => {
            return i.quantity > 0;
        });
    }

    // only when logging in from anonymous state
    // if already logged in, do not merge - clear cart
    mergeCart(cart: ICart) {
        cart.items.forEach((i: ICartItem) => {
            let item = this.cart.items.find((j: ICartItem) => {
                return (j.id === i.id);
            });
            if (item !== undefined) {
                i.quantity += item.quantity;
            } else {
                this.cart.items.push({
                    id: i.id,
                    quantity: i.quantity
                });
            }
        });
    }
}
