import {Component, Input, OnInit} from '@angular/core';
import {MedicalRecord, Patient} from "../../objects/patient.config";
import {PatientService} from "../../services/patient.service";
import {Router} from "@angular/router";
import {SharedService} from "../../services/shared.service";

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
              private router: Router) { }

  ngOnInit(): void {}

  async openPatientCard(patient: Patient) {
    this.sharedService.data = patient;
    this.router.navigate(['/patients/documentation']);
  }

  setStep(index: number) {
    this.step = index;
  }

}
