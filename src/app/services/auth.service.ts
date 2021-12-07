import { Injectable } from '@angular/core';
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLogged: boolean = true;

  constructor(private userService: UserService) { }

  /*public logIn(): boolean {
    this.isLogged = true;
    return true;
  }*/

  public logIn(username: string, password: string): boolean {
    const result = this.userService.users.filter( user => user.personalNumber === username && user.password === password);
    if (result.length > 0) {
      this.isLogged = true;
      this.userService.setUser(result[0]);
      return true;
    }
    this.isLogged = false;
    return false;
  }

  public isLogIn(): boolean {
    return this.userService.isUserSet();
  }

  public logOut() {
    this.isLogged = false;
    this.userService.removeUser();
  }
}
