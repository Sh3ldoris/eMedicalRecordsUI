import { Injectable } from '@angular/core';
import {Insurance, Patient, Person, UrgentInfo} from "../objects/patient.config";
import {PersonService} from "./person.service";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

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
    },
    {
      allergies: 'Mlieko, lepok',
      otherRisks: 'Príliš nebezpečný pre svoje okolie',
      permanentMedicals: 'Antihistamiká',
      infections: 'Zltacka',
      organDonation: 'Súhlas pre darovanie kostnej drene',
      height: 180,
      weight: 92,
      tetanus: new Date(),
      transplantation: '',
      bloodGroup: '0'
    }
  ];

  private insurance: Insurance[] = [
    {
      insuranceCode : '499013232'
    },
  ]

  private patients: Patient[] = [
    {
      code: 'SK019810',
      insurance: this.insurance[0],
      person: this.personService.getPersonByBirthNumber('981010/1423'),
      urgentInfo: this.urgentInfo[0],
      canAccess: [
        '5ZY0153'
      ]
    },
    {
      code: 'SK019810',
      insurance: this.insurance[0],
      person: this.personService.getPersonByBirthNumber('961210/3514'),
      urgentInfo: this.urgentInfo[1],
      canAccess: [
        '5ZY0123'
      ]
    },
    {
      code: 'SK014858',
      insurance: this.insurance[0],
      person: this.personService.getPersonByBirthNumber('961210/3514'),
      urgentInfo: this.urgentInfo[1],
      canAccess: [
        '5ZY0123',
        '5ZY0153'
      ]
    },
  ]

  constructor(private personService: PersonService) { }

  public getAllPatient(): Patient[] {
      return this.patients;
  }

  public getAllPatientByDoctor(personalNumber: string): Patient[] {
    console.log(personalNumber);
    return this.patients.filter(p => p.canAccess && p.canAccess.includes(personalNumber));
  }

  public getPatientsByFilter(
    filter: {
      address: string,
      birthNumber: string,
      lastName: string,
      name: string
  }): Patient[] {

    return this.patients.filter(
      p =>
        p.person.birthNumber.includes(filter.birthNumber) &&
        p.person.lastName.toLocaleLowerCase().includes(filter.lastName.toLocaleLowerCase()) &&
        p.person.firstName.toLocaleLowerCase().includes(filter.name.toLocaleLowerCase()) &&
        p.person.address?.toLocaleLowerCase().includes(filter.address.toLocaleLowerCase())
    );
  };
}
