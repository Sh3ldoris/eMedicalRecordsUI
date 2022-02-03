import { Component, OnInit } from '@angular/core';
import {Patient} from "../../objects/patient.config";
import {PatientService} from "../../services/patient.service";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-can-access-patients',
  templateUrl: './can-access-patients.component.html',
  styleUrls: ['./can-access-patients.component.scss']
})
export class CanAccessPatientsComponent implements OnInit {

  patients: Patient[] = [];
  isNewRecordFormOpen: boolean = false;

  private filter: any = null;

  constructor(public patientService: PatientService,
              private userService: AuthService) { }

  ngOnInit(): void {
    if (this.filter === null) {
      this.loadData();
    }
  }

  filterApplied(event: any) {
    if (event !== null) {
      this.patientService.getPatientsByFilter(event).subscribe((next: Patient[]) => {this.patients = next});
    } else {
      this.loadData();
    }
  }

  openReportForm() {
    this.isNewRecordFormOpen = true;
  }

  public onCloseReport(event: any) {
    this.isNewRecordFormOpen = false;
    if (event === true) {
      this.loadData();
    }
  }

  private loadData() {
    this.patientService.getAllPatientByDoctor(this.userService.getLoggedUser().personalNumber)
      .subscribe((next: Patient[]) => {this.patients = next});
  }

}
