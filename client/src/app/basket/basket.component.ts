import { isDelegatedFactoryMetadata } from '@angular/compiler/src/render3/r3_factory';
import { Component, OnInit } from '@angular/core';
import { ICart } from 'src/interfaces/ICart';
import { ICartItem } from 'src/interfaces/ICartItem';
import { IProduct } from 'src/interfaces/IProduct';
import { IUser } from 'src/interfaces/IUser';
import { CartService } from '../cart.service';
import { ProductsService } from '../products.service';
import { UserService } from '../user.service';

@Component({
    selector: 'app-basket',
    templateUrl: './basket.component.html',
    styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

    cart: ICart;

    constructor(private cartService: CartService, private userService: UserService, private productsService: ProductsService) { 
        this.cart = this.cartService.getEmptyCart();
    }

    ngOnInit(): void {
        this.userService.$currentUser.subscribe((user:IUser|null) => {
            if (user) {
                this.cartService.getCart(user).subscribe((cart: ICart) => {
                    console.log(cart);
                    this.cart = cart;
                    this.cart.products.forEach((item: ICartItem) => {
                        this.productsService.getProduct(item.id).subscribe((product: IProduct) => {
                            item.product = product;
                        });
                    });

                    console.log(this.cart);
                });
            }
        });
    }

}
