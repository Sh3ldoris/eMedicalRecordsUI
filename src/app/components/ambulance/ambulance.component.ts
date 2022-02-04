import {Component, OnInit} from '@angular/core';
import {Doctor} from "../../objects/user.config";
import {DoctorService} from "../../services/doctor.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-ambulance',
  templateUrl: './ambulance.component.html',
  styleUrls: ['./ambulance.component.scss']
})
export class AmbulanceComponent implements OnInit {

  user: Doctor;

  constructor(private docService: DoctorService,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.loadUser();
  }

  private loadUser() {
    this.docService.getDoctorByPersonalNumber(this.auth.getLoggedPersonalNumber())
      .subscribe(
        (data: Doctor) => {
          console.log("User loading");
          this.user = data;
        }
      );
  }

}
