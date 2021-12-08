import { Component, OnInit } from '@angular/core';
import {PatientService} from "../../services/patient.service";
import {Patient} from "../../objects/patient.config";
import {query} from "@angular/animations";

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
    console.log(this.filter);
    if (this.filter === null) {
      this.loadData();
    }
  }

  filterApplied(event: any) {
    if (event !== null) {
      this.patients = this.patientService.getPatientsByFilter(event);
    } else {
      this.loadData();
    }
  }

  private loadData() {
    this.patients = this.patientService.getAllPatient();
  }

}
