import { Injectable } from '@angular/core';
import {User} from "../objects/user.config";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  public getUser(): User {
    return {
      personalNumber: '5ZY0123',
      name: 'MUDr. Vladimír Kucko',
      specification: 'oftalmológ'
    }
  }
}
