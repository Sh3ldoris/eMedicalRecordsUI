import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {LoginResponse} from "../objects/auth.config";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient,
              private cookies: CookieService) {}

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

  public setLoggedPersonalNumber(personalNumber: string) {
    this.cookies.delete('DOCTOR');
    this.cookies.set('DOCTOR', personalNumber);
  }

  public getLoggedPersonalNumber(): string {
    return this.cookies.get('DOCTOR');
  }

  public saveToken(token: string) {
    this.cookies.delete('TOKEN');
    this.cookies.set('TOKEN', token);
  }

  public getToken(): string {
    return this.cookies.get('TOKEN');
  }

  public isLogIn(): boolean {
    return this.cookies.get('TOKEN') !== '';
  }

  public logOut() {
    this.cookies.set('TOKEN', '');
    this.cookies.set('DOCTOR', '');
  }
}
