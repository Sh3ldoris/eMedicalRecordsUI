import { Injectable } from '@angular/core';
import {Ambulance, Doctor} from "../objects/user.config";
import {PersonService} from "./person.service";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Patient} from "../objects/patient.config";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  ambulances: Ambulance[] = [
    {
      name: 'O Č N Á   A M B U L A N C I A',
      address: 'ul. V. Spanyola 43, Žilina 010 01'
    },
    {
      name: 'Všeobecná ambulancia pre deti a dorast, Valaská',
      address: 'Štúrova  481/5 97646  Valaská'
    }
  ];

  private doctors: Doctor[] = [
    {
      personalNumber: '5ZY0123',
      password: 'admin123',
      person: this.personService.getPersonByBirthNumber('doctor/1'),
      specification: 'oftalmológ',
      ambulance: this.ambulances[0]
    },
    {
      personalNumber: '5ZY0153',
      password: 'lekar',
      person: this.personService.getPersonByBirthNumber('doctor/2'),
      specification: 'všeobecná starostlivosť o deti a dorast',
      ambulance: this.ambulances[1]
    },
  ];

  constructor(private personService: PersonService,
              private http: HttpClient) { }

  public getDoctorByPersonalNumber(pn: string) : Observable<Doctor> {
    return this.getDoctorFromServer(pn);
  }

  private getDoctorFromServer(pn: string): Observable<Doctor> {
    return this.http.get('/api/doctors/' + pn)
      .pipe(map((response: any) => response))
      .pipe(map((result: Doctor) => {
          result.person.birthDate = new Date(result.person.birthDate);
          return result;
        }
      ));
  }
}
