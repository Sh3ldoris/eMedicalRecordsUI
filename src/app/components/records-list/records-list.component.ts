import {Component, Input, OnInit} from '@angular/core';
import {MedicalRecord, Patient} from "../../objects/Record";
import {PatientService} from "../../services/patient.service";

@Component({
  selector: 'app-records-list',
  templateUrl: './records-list.component.html',
  styleUrls: ['./records-list.component.scss']
})
export class RecordsListComponent implements OnInit {

  step = -1;
  @Input() patients: Patient[] = [];

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {}

  setStep(index: number) {
    this.step = index;
  }

}
