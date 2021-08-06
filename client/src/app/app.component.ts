import { Component } from '@angular/core';
import { IUser } from 'src/interfaces/IUser';
import { CartService } from './cart.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(private userService: UserService, private cartService: CartService) {
        this.userService.$currentUser.subscribe((user:IUser|null) => {
            if (user) {
                this.cartService.loadCart(user.id);
            }
        });
    }
}
