import { Component, OnInit } from '@angular/core';
import {PatientService} from "../../services/patient.service";
import {Patient} from "../../objects/patient.config";

@Component({
  selector: 'app-all-patients',
  templateUrl: './all-patients.component.html',
  styleUrls: ['./all-patients.component.scss']
})
export class AllPatientsComponent implements OnInit {

  patients: Patient[] = [];

  private filter: any = null;

  constructor(public patientService: PatientService) { }

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
    this.patientService.getAllPatient().subscribe((next: Patient[]) => {this.patients = next});
  }
}
