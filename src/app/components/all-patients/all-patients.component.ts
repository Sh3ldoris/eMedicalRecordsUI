import { Component, OnInit } from '@angular/core';
import {PatientService} from "../../services/patient.service";

@Component({
  selector: 'app-all-patients',
  templateUrl: './all-patients.component.html',
  styleUrls: ['./all-patients.component.scss']
})
export class AllPatientsComponent implements OnInit {

  constructor(public patientService: PatientService) { }

  ngOnInit(): void {
  }

}
