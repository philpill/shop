import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '../cart.service';
import { ProductsService } from '../products.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

    public $products: Observable<any>;
    public products: any[];

    private pageSize: number;
    public currentPage: number;
    public numPages: number;
    public numItems: number;

    constructor(private productsService: ProductsService, private cartService: CartService) {

        this.$products = new Observable<any>();
        this.products = [];
        this.pageSize = 6;
        this.currentPage = 1;
        this.numPages = 1;
        this.numItems = 0;
    }

    ngOnInit(): void {
        this.getProducts();
    }

    getProducts() {
        this.productsService.getProductsByPage(this.currentPage, this.pageSize).subscribe((data) => {
            this.products = data.body;
            console.log(data);
            console.log(this.products);
            let totalHeader = data.headers.get('X-Total-Count') || '';
            let total = parseInt(totalHeader, 10);
            this.numItems =  isNaN(total) ? 0 : total;
            this.numPages = this.numItems ? Math.ceil(this.numItems / this.pageSize) : 1;
        });
    }

    onNextPage() {
        this.currentPage = this.currentPage < this.numPages ? this.currentPage + 1 : this.numPages
        this.getProducts();
    }

    onPreviousPage() {
        this.currentPage = this.currentPage === 0 ? 0 : this.currentPage - 1;
        this.getProducts();
    }

    onItemsChange(e: Event) {
        let el = e.target as HTMLSelectElement;
        let numItems = parseInt(el.value, 10);
        this.pageSize = isNaN(numItems) ? this.numItems : numItems;
        this.currentPage = 1;
        this.getProducts();
    }

    onAddProduct(id: number) {
        this.cartService.addItem(id, 1);
    }
}
