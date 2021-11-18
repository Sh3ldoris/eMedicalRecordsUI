import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLogged: boolean = true;

  constructor() { }

  public logIn() {
    this.isLogged = true;
  }

  public logOut() {
    this.isLogged = false;
  }
}
