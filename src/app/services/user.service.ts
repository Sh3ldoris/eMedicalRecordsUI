import { Injectable } from '@angular/core';
import {Ambulance, User} from "../objects/user.config";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  ambulances: Ambulance[] = [
    {
      name: 'O Č N Á   A M B U L A N C I A',
      address: 'ul. V. Spanyola 43, Žilina 010 01'
    },
    {
      name: 'Všeobecná ambulancia pre deti a dorast, Valaská',
      address: 'Štúrova  481/5 97646  Valaská'
    }
  ];

  users: User[] =  [
    {
      personalNumber: '5ZY0123',
      password: 'admin123',
      name: 'MUDr. Vladimír Kucko',
      specification: 'oftalmológ',
      ambulance: this.ambulances[0]
    },
    {
      personalNumber: '5ZY0153',
      password: 'lekar',
      name: 'MUDr. Elena Auxtová',
      specification: 'všeobecná starostlivosť o deti a dorast',
      ambulance: this.ambulances[1]
    }
  ];

  private currentUser: User = this.users[0];
  private isUserSetOn: boolean = true;

  constructor() { }

  public getUser(): User {
    return this.currentUser;
  }

  public isUserSet() : boolean {
    return this.isUserSetOn;
  }

  public setUser(user: User) {
    this.isUserSetOn = true;
    this.currentUser = user;
  }

  public removeUser() {
    this.isUserSetOn = false;
  }
}
