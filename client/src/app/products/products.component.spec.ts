import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Type } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
    let component: ProductsComponent;
    let fixture: ComponentFixture<ProductsComponent>;
    let httpMock: HttpTestingController;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
            declarations: [ProductsComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductsComponent);
        component = fixture.componentInstance;
        httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
        fixture.detectChanges();
    });

    afterEach(() => {
        httpMock.verify();
      });

    it('should load products on init', () => {

        let mock = [{
            id: 1,
            name: '',
            description: '',
            defaultImage: '',
            images: [''],
            price: 100,
            discount: 5
        }];

        let requests = httpMock.match('http://localhost:8080/products?_page=1&_limit=6'); 
        expect(requests.length).toBe(2);
        requests[0].flush(mock);
        httpMock.expectOne('http://localhost:8080/users/1');
        expect(component.products.length).toBeGreaterThan(0);
    });
});
