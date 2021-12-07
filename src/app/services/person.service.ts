import { Injectable } from '@angular/core';
import {Person} from "../objects/patient.config";

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private persons: Person[] = [
    {
      firstName: 'Adam',
      lastName: 'Lány',
      gender: 'MALE',
      birthNumber: '981010/1423',
      birthName: 'Lány',
      birthDate: new Date(),
      address: 'Zábrežná 203/8, Predaná',
      phone: '+421944911835',
      familyState: 'Sloboný',
      occupation: 'Študent'
    },
    {
      firstName: 'Emil',
      lastName: 'Báči',
      gender: 'MALE',
      birthNumber: '961210/3514',
      birthName: 'Báči',
      birthDate: new Date(),
      address: 'Potočná 400, Horná Dolná',
      phone: '+421944911835',
      familyState: 'Sloboný',
      occupation: 'Robotník, fajnšmeker'
    },
    {
      firstName: 'Cecília',
      lastName: 'Kôprová',
      gender: 'FEMALE',
      birthNumber: '961210/3514',
      birthName: 'Pohančíková',
      birthDate: new Date(),
      address: 'Potočná 400, Horná Dolná',
      phone: '+421944911835',
      familyState: 'Sloboný',
      occupation: 'Úradníčka'
    },
    {
      firstName: 'MUDr. Vladimír',
      lastName: 'Kucko',
      gender: 'MALE',
      birthNumber: 'doctor/1',
      birthName: '',
      birthDate: new Date(),
      address: '',
      phone: '',
      familyState: '',
      occupation: ''
    },
    {
      firstName: 'MUDr. Elena',
      lastName: 'Auxtová',
      gender: 'FEMALE',
      birthNumber: 'doctor/2',
      birthName: '',
      birthDate: new Date(),
      address: '',
      phone: '',
      familyState: '',
      occupation: ''
    },
  ];

  constructor() { }

  public getPersonByBirthNumber(bn : string): Person {
    const result = this.persons.filter(p => p.birthNumber === bn);
    return result[0];
  }

  public getAllPersons(): Person[] {
    return this.persons;
  }
}
