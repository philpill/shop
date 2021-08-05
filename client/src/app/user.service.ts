import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    public currentUser: any;

    constructor(private http: HttpClient) { }

    login(username: string, password: string): Observable<any> {
        return this.http.get<any>('http://localhost:8080/users');
    }
}
