import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, Validators} from '@angular/forms';
import {LoginResponse} from "../../objects/auth.config";
import {Doctor} from "../../objects/user.config";
import {DoctorService} from "../../services/doctor.service";

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
              private router: Router,
              private doctorService: DoctorService) { }

  ngOnInit(): void {
    if (this.auth.isLogIn()) {
      console.log('geeeee');
      this.router.navigate(['/']);
    }
  }

  submitLogin() {
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
    }
    this.auth.tryLogin(this.loginForm.get('personalNumber')?.value,  this.loginForm.get('password')?.value)
      .subscribe(
        (data: LoginResponse) => {
          this.auth.saveToken(data.token);
          this.doctorService.getDoctorByPersonalNumber(data.personalNumber)
            .subscribe(
              (data: Doctor) => {
                this.auth.setUser(data);
                this.router.navigate(['']);
              }
            );
        },
        error => {
          this.isLoginInformationRight = false;
          this.isPasswordRight = false;
        }
      )
  }

}
