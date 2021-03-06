import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SharedService} from "./services/shared.service";
import {Router} from "@angular/router";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'eMedical-records-system-UI';
  public hideNavigationBar?: boolean;

  constructor(public sharedService: SharedService,
              private router: Router,
              private auth: AuthService) {}

  ngOnInit(): void {
    this.hideNavigationBar = this.sharedService.isWithOutNavigationBar();

    if (!this.auth.isLogIn()) {
      this.router.navigate(['/sign-in']);
    }
  }
}
