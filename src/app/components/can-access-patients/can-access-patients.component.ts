import { Component, OnInit } from '@angular/core';
import {Patient} from "../../objects/patient.config";
import {PatientService} from "../../services/patient.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-can-access-patients',
  templateUrl: './can-access-patients.component.html',
  styleUrls: ['./can-access-patients.component.scss']
})
export class CanAccessPatientsComponent implements OnInit {

  patients: Patient[] = [];

  private filter: any = null;

  constructor(public patientService: PatientService,
              private userService: UserService) { }

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

  private loadData() {
    this.patientService.getAllPatientByDoctor(this.userService.getUser().personalNumber)
      .subscribe((next: Patient[]) => {this.patients = next});
  }

}
