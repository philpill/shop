import { Component, OnInit } from '@angular/core';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { IOrder } from 'src/interfaces/IOrder';
import { IProduct } from 'src/interfaces/IProduct';
import { IUser } from 'src/interfaces/IUser';
import { ProductsService } from '../products.service';
import { UserService } from '../user.service';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

    currentUser: IUser | null;
    products: IProduct[];

    constructor(private userService: UserService, private productService: ProductsService) {
        this.currentUser = null;
        this.products = [];
    }

    ngOnInit(): void {
        this.userService.$currentUser.subscribe((user: IUser | null) => {
            this.currentUser = user;
            if (user) {

                let ids: number[] = [];
                user.orders.forEach(o => {
                    o.products.forEach((ps) => {
                        ids.push(ps.id);
                    });
                });

                console.log('ids ', ids);

                this.productService.getProducts(ids || []).subscribe((products: IProduct[]) => {
                    this.products = products;
                    console.log('this.products ', this.products);
                    
                    user.orders.forEach((order: IOrder) => {
                        order.products.forEach((product: {
                            id: number;
                            detail?: IProduct;
                            quantity: number;
                        }) => {
                            console.log('product ', product);
                            product.detail = this.products.find((p: IProduct) => { return p.id === product.id; });
                            console.log('product.detail ', product.detail);
                        });
                    });
                });
                
            }
        });
    }

}
