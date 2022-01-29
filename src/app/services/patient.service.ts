import { Injectable } from '@angular/core';
import {Insurance, Patient, UrgentInfo} from "../objects/patient.config";
import {PersonService} from "./person.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { map } from 'rxjs/operators';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  /*private urgentInfo: UrgentInfo[] = [
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
  ];

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
  ];*/
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private personService: PersonService,
              private http: HttpClient) {
  }

  public getAllPatient(): Observable<Patient[]> {
      return this.getAllMockedPatients();
  }

  //TODO Patients: Add Doctor parameter
  public getAllPatientByDoctor(personalNumber: string): Observable<Patient[]> {
    return this.getMockedPatientsByDoctor(personalNumber);
  }

  public getPatientsByFilter(
    filter: {
      address: string,
      birthNumber: string,
      lastName: string,
      name: string
  }): Observable<Patient[]> {
    return this.http.get('/api/patients')
      .pipe(map((response: any) => response))
      .pipe(map((result: Patient[]) => {
          result = result.filter(p =>
            p.person.birthNumber.includes(filter.birthNumber) &&
            p.person.lastName.toLocaleLowerCase().includes(filter.lastName.toLocaleLowerCase()) &&
            p.person.firstName.toLocaleLowerCase().includes(filter.name.toLocaleLowerCase()) &&
            p.person.address?.toLocaleLowerCase().includes(filter.address.toLocaleLowerCase()));
          result.forEach(p => {
            p.person.birthDate = new Date(p.person.birthDate);
            p.urgentInfo.tetanus = new Date(p.urgentInfo.tetanus);
          });
          return result;
        }
      ));
  };

  public getPatientByCode(code: string): Observable<Patient> {
    return this.getMockedPatientByCode(code);
  }

  public saveNewPatient(p: Patient): Observable<any> {
    return this.http.post('/api/patients', p, {headers: this.headers});
  }

  //TODO Patients: Pass only patient object
  public updatePatient(patient: Patient): Observable<Patient> {
    console.log(patient);
    return this.http.put('/api/patients/' + patient.code, patient, {headers: this.headers})
      .pipe(map((response: any) => response))
      .pipe(map((result: Patient) => {
        result.person.birthDate = new Date(result.person.birthDate);
        result.urgentInfo.tetanus = new Date(result.urgentInfo.tetanus);
        return result;
      }));
  }

  private getAllMockedPatients(): Observable<Patient[]> {
    return this.http.get('/api/patients')
      .pipe(map((response: any) => response))
      .pipe(map((result: Patient[]) => {
          console.log(result);
          result.forEach(p => {
            p.person.birthDate = new Date(p.person.birthDate);
            p.urgentInfo.tetanus = new Date(p.urgentInfo.tetanus);
          });
          return result;
        }
      ));
  }

  private getMockedPatientsByDoctor(personalNumber: string): Observable<Patient[]> {
    return this.http.get('/api/patients')
      .pipe(map((response: any) => response))
      .pipe(map((result: Patient[]) => {
          result = result.filter(p => p.canAccess && p.canAccess.includes(personalNumber));
          result.forEach(p => {
            p.person.birthDate = new Date(p.person.birthDate);
            p.urgentInfo.tetanus = new Date(p.urgentInfo.tetanus);
          });
          return result;
        }
      ));
  }

  private getMockedPatientByCode(code: string): Observable<Patient> {
      return this.http.get('/api/patients/' + code)
        .pipe(map((response: any) => response))
        .pipe(map((result: Patient) => {
          console.log(result);
          result.person.birthDate = new Date(result.person.birthDate);
          result.urgentInfo.tetanus = new Date(result.urgentInfo.tetanus);
          return result;
        }
      ));
  }

}
