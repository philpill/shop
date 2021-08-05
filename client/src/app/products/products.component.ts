import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from '../products.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

    public $products: Observable<any>;
    public products: any[];
    public loadedProducts: any[];

    private pageSize: number;
    public currentPage: number;
    public numPages: number;

    constructor(private readonly productsService: ProductsService) {

        this.$products = new Observable<any>();
        this.products = [];
        this.loadedProducts = [];
        this.pageSize = 6;
        this.currentPage = 1;
        this.numPages = 1;

    }

    ngOnInit(): void {

        this.productsService.getProducts().subscribe((data) => {
            this.currentPage = 0;
            this.products = data;
            this.numPages = Math.ceil(data.length / this.pageSize);
            this.loadProducts();
        });
    }

    onNextPage() {
        this.currentPage = this.currentPage < this.numPages ? this.currentPage + 1 : this.numPages
        this.loadProducts();
    }

    onPreviousPage() {
        this.currentPage = this.currentPage === 0 ? 0 : this.currentPage - 1;
        this.loadProducts();
    }

    loadProducts() {
        this.loadedProducts = [];
        let startIndex = this.pageSize * this.currentPage;
        for (let i = startIndex; i < startIndex + this.pageSize; i++) {
            console.log(this.products[i]);
            this.loadedProducts.push(this.products[i]);
        }
    }
}
