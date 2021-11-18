import { Injectable } from '@angular/core';
import {User} from "../objects/user.config";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private auth: AuthService) { }

  public getUser(): User {
    return {
      personalNumber: '5ZY0123',
      name: 'MUDr. Vladimír Kucko',
      specification: 'oftalmológ'
    }
  }

  public isUserLoggedIn(): boolean {
    return this.auth.isLogged;
  }
}
