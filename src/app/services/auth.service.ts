import {Injectable} from '@angular/core';
import {UserService} from "./user.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {LoginResponse} from "../objects/auth.config";
import {CookieService} from "ngx-cookie-service";
import {Doctor} from "../objects/user.config";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLogged: boolean = true;

  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private userService: UserService,
              private http: HttpClient,
              private cookies: CookieService) { }

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

  public tryLogin(username: string, password: string): Observable<LoginResponse> {
    console.log('login');
    let req = {
      personalNumber: username,
      password: password
    }
    return this.http.post('/api/auth', req, {headers: this.headers})
      .pipe(map((response: any) => response))
      .pipe(map((result: LoginResponse) => {
          console.log(result);
          return result;
        }
      ));
  }

  public setUser(user: Doctor) {
    this.cookies.delete('DOCTOR');
    this.cookies.set('DOCTOR', JSON.stringify(user));
  }

  public getLoggedUser(): Doctor {
    return JSON.parse(this.cookies.get('DOCTOR'));
  }

  public saveToken(token: string) {
    this.cookies.delete('TOKEN');
    this.cookies.set('TOKEN', token);
  }

  public getToken(): string {
    return this.cookies.get('TOKEN');
  }

  public isLogIn(): boolean {
    return this.cookies.get('DOCTOR') !== '';
  }

  public logOut() {
    this.cookies.set('TOKEN', '');
    this.cookies.set('DOCTOR', '');
  }
}
