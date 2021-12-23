import { Component, OnInit } from '@angular/core';
import {MenuConfig, MenuItemConfig} from "../../objects/menu.config";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public config?: MenuConfig;

  constructor(public userService: UserService,
              private router: Router,
              private auth: AuthService) {}

  ngOnInit(): void {
    this.setConfig();
  }

  public setConfig() {
    const menuCnfg: MenuConfig = {
      items: [
        /*{
          title: 'Test',
          icon: 'fa fa-ambulance',
          path: '/test',
        },*/
        {
          title: 'Pacienti',
          icon: 'fa fa-users',
          path: '/patients/all',
        },
        {
          title: 'Moji pacienti',
          icon: 'fa fa-users',
          path: '/patients/mine',
        },
        {
          title: 'Ambulancia',
          icon: 'fa fa-ambulance',
          path: '/ambulance',
        }
      ],
    }


    this.config = menuCnfg;
  }

  public navigateTo(menuItem: MenuItemConfig) {
      this.router.navigate([menuItem.path]);
  }

  logOut() {
    this.auth.logOut();
    this.router.navigate(['/sign-in']);
  }

}
