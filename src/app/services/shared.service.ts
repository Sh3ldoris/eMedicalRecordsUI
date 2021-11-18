import { Injectable } from '@angular/core';
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private userService: UserService) { }

  public isWithOutNavigationBar(): boolean {
    return !this.userService.isUserLoggedIn();
  }
}
