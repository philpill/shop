import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/interfaces/IUser';
import { UserService } from '../user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    currentUser: IUser | null;

    constructor(private userService: UserService) { 

        this.currentUser = null;
    }

    ngOnInit(): void {
        this.userService.$currentUser.subscribe((user: IUser | null) => {
            this.currentUser = user;
        });
    }

}
