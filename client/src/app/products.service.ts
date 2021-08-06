import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IProduct } from 'src/interfaces/IProduct';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    constructor(private http: HttpClient) {

    }

    public getProduct(id: number): Observable<IProduct> {
        return this.http.get<IProduct>(`http://localhost:8080/products/${ id }`);
    }

    public getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>('http://localhost:8080/products');
    }

    public getProductsByPage(page: number, numItems: number): Observable<HttpResponse<any>> {
        return this.http.get<IProduct[]>(`http://localhost:8080/products?_page=${ page }&_limit=${ numItems }`, { observe: 'response' });
    }
}
