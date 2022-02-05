import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Patient} from "../../objects/patient.config";
import {PatientService} from "../../services/patient.service";
import {v4 as uuid} from "uuid";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.scss']
})
export class NewPatientComponent implements OnInit {

  @Output() close = new EventEmitter();

  patientForm = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    birthNumber: [null, Validators.required],
    birthDate: [null, Validators.required],
    familyState: [null, Validators.required],
    occupation: [null, Validators.required],
    gender: [null, Validators.required],
    address: [null, Validators.required],
    phone: [null, Validators.required],
    height: [null],
    weight: [null],
    bloodGroup: [null],
    tetanus: [null],
    allergies: [null],
    otherRisks: [null],
    permanentMedicals: [null],
    infections: [null],
    organDonation: [null],
    transplantation: [null],
  });

  constructor(private fb: FormBuilder,
              private patientService: PatientService,
              private auth: AuthService) { }

  ngOnInit(): void {
  }

  confirm() {
    for (const i in this.patientForm.controls) {
      this.patientForm.controls[i].markAsDirty();
    }
    const newPatient : Patient = {
      code: uuid(),
      insurance: uuid(),
      person: {
        firstName: this.patientForm.get('firstName')?.value,
        lastName: this.patientForm.get('lastName')?.value,
        gender: this.patientForm.get('gender')?.value,
        birthNumber: this.patientForm.get('birthNumber')?.value,
        birthDate: this.patientForm.get('birthDate')?.value,
        address: this.patientForm.get('address')?.value  || '',
        phone: this.patientForm.get('phone')?.value,
        familyState: this.patientForm.get('familyState')?.value,
        occupation: this.patientForm.get('occupation')?.value
      },
      urgentInfo: {
        allergies: this.patientForm.get('allergies')?.value  || '',
        otherRisks: this.patientForm.get('otherRisks')?.value  || '',
        permanentMedicals: this.patientForm.get('permanentMedicals')?.value  || '',
        infections: this.patientForm.get('infections')?.value || '',
        organDonation: this.patientForm.get('organDonation')?.value || '',
        height: this.patientForm.get('height')?.value | 0,
        weight: this.patientForm.get('weight')?.value | 0,
        tetanus: this.patientForm.get('tetanus')?.value,
        transplantation: this.patientForm.get('transplantation')?.value  || '',
        bloodGroup: this.patientForm.get('bloodGroup')?.value  || ''
      },
      canAccess: [this.auth.getLoggedPersonalNumber()]
    };

    console.log(newPatient);
    this.patientService.saveNewPatient(newPatient).subscribe(
      (data: any) => {
        this.close.emit(true);
      }
    );
  }

}
