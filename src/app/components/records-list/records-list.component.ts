import {Component, Input, OnInit} from '@angular/core';
import {Patient} from "../../objects/patient.config";
import {PatientService} from "../../services/patient.service";
import {Router} from "@angular/router";
import {SharedService} from "../../services/shared.service";
import {UserService} from "../../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {AccessDeniedComponent} from "../access-denied/access-denied.component";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-records-list',
  templateUrl: './records-list.component.html',
  styleUrls: ['./records-list.component.scss']
})
export class RecordsListComponent implements OnInit {

  step = -1;
  @Input() patients: Patient[] = [];

  constructor(private patientService: PatientService,
              private sharedService: SharedService,
              private router: Router,
              private userService: AuthService,
              public dialog: MatDialog) { }

  ngOnInit(): void {}

  openPatientCard(patient: Patient) {
    if (patient.canAccess?.includes(this.userService.getLoggedUser().personalNumber)) {
      this.sharedService.data = patient;
      this.router.navigate(['/patients/documentation/' + patient.code]);
    } else {
      const dialogRef = this.dialog.open(AccessDeniedComponent);
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
  }

  setStep(index: number) {
    this.step = index;
  }

}
