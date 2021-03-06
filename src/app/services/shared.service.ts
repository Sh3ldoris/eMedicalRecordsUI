import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  data: any;
  isLoading: boolean = false;
  isLoadingContent: boolean = false;

  constructor(private auth: AuthService) { }

  public isWithOutNavigationBar(): boolean {
    return !this.auth.isLogIn();
  }
}
