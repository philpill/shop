import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from 'src/interfaces/IUser';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    public $currentUser: BehaviorSubject<IUser|null>;

    constructor(private http: HttpClient) { 
        this.$currentUser = new BehaviorSubject<IUser|null>(null);
        this.loadFirstUser();
    }

    login(username: string, password: string): Observable<IUser> {
        return this.http.get<IUser>('http://localhost:8080/users');
    }

    loadFirstUser() {
        this.http.get<IUser>('http://localhost:8080/users/1').subscribe((user: IUser) => {
            this.$currentUser.next(user);
        });
    }
}
