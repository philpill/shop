import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { combineLatest, Observable, throwError } from 'rxjs';
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

    public getProducts(ids: number[]): Observable<IProduct[]> {

        let $req = ids.map((id) => {
            return this.http.get<IProduct>(`http://localhost:8080/products/${ id }`);
        });

        return combineLatest($req);
    }

    public getProductsByPage(page: number, numItems: number, search: string): Observable<HttpResponse<any>> {

        let url = `http://localhost:8080/products?_page=${ page }&_limit=${ numItems }`;

        if (search) {
            url = `${ url }&q=${ search }`;
        }

        return this.http.get<IProduct[]>(url, { observe: 'response' });
    }

    public getProductsBySearch(numItems: number, searchTerm: string): Observable<HttpResponse<any>> {

        let url = `http://localhost:8080/products?_limit=${ numItems }&q=${ searchTerm }`;

        return this.http.get<IProduct[]>(url, { observe: 'response' });
    }
}
