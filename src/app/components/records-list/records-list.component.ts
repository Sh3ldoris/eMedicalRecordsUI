import {Component, Input, OnInit} from '@angular/core';
import {MedicalRecord, Patient} from "../../objects/patient.config";
import {PatientService} from "../../services/patient.service";
import {Router} from "@angular/router";
import {SharedService} from "../../services/shared.service";
import {UserService} from "../../services/user.service";

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
              private userService: UserService) { }

  ngOnInit(): void {}

  openPatientCard(patient: Patient) {
    if (patient.canAccess?.includes(this.userService.getUser().personalNumber)) {
      this.sharedService.data = patient;
      this.router.navigate(['/patients/documentation']);
    } else {
      console.error('YOu have no permission for this patient!');
    }
  }

  setStep(index: number) {
    this.step = index;
  }

}
