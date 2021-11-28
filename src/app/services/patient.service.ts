import { Injectable } from '@angular/core';
import {Patient, Person, UrgentInfo} from "../objects/Record";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private persons: Person[] = [
    {
      firstName: 'Adam',
      lastName: 'Lány',
      birthNumber: '981010/4029',
      birthName: 'Lány',
      birthDate: new Date(),
      address: 'Zábrežná 203/8, Predaná',
      phone: '+421944911835',
      familyState: 'Sloboný',
      occupation: 'Študent'
    },
  ];

  private urgentInfo: UrgentInfo[] = [
    {
      allergies: 'Pele tráv, prach',
      otherRisks: 'Príliš nebezpečný pre svoje okolie',
      permanentMedicals: 'Antihistamiká',
      infections: 'Závažná infekcia',
      organDonation: 'Súhlas pre darovanie kostnej drene',
      height: 185,
      weight: 82,
      tetanus: new Date(),
      transplantation: 'Transplantovaná ľavá bradavka',
      bloodGroup: 'B+'
    }
  ];

  private patients: Patient[] = [
    {
      code: 'SK019810',
      person: this.persons[0],
      urgentInfo: this.urgentInfo[0]
    },
  ]

  constructor() { }

  public getAllPatient(): Patient[] {
      return this.patients;
  }
}
