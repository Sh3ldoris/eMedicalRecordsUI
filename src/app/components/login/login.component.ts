import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    personalNumber: [null, Validators.required],
    password: [null, [Validators.required, Validators.minLength(5)]]
  });

  isPasswordRight = true;
  isLoginInformationRight = true;
  isLoading = false;

  constructor(private auth: AuthService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    if (this.auth.isLogged) {
      this.router.navigate(['/']);
    }
  }

  submitLogin() {
    this.auth.logIn();
    this.router.navigate(['']);
  }

}
