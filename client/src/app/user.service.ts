import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from 'src/interfaces/IUser';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private currentUser: IUser | null;

    constructor(private http: HttpClient) { 
        this.currentUser = null;
    }

    login(username: string, password: string): Observable<any> {
        return this.http.get<any>('http://localhost:8080/users');
    }

    getCurrentUser(): IUser | null {
        return this.currentUser;
    }
}
