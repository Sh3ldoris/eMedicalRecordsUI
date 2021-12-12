import { Injectable } from '@angular/core';
import { HealthRecord} from "../objects/health-record.config";
import {DoctorService} from "./doctor.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Patient} from "../objects/patient.config";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HealthRecordService {

  private records: HealthRecord[] = [
    {
      patientCode: 'SK019810',
      date: new Date(),
      title: 'Obvodná prehliadka 2021',
      doctor: this.docsService.getDoctorByPersonalNumber('5ZY0123'),
      report: 'Vsetko v norme, podla ocakavani, nic nezvucajne nenajdene'
    },
    {
      patientCode: 'SK019810',
      date: new Date(),
      title: 'Krvne odbery pre potreby nastupenia do prace',
      doctor: this.docsService.getDoctorByPersonalNumber('5ZY0123'),
      report: 'Pacietovi bola odobrata krvna vzorka, ktora bola odoslana na testy'
    }
  ];

  constructor(private docsService: DoctorService,
              private http: HttpClient) { }

  public getAllRecordsByPatientCode(pc: string): Observable<HealthRecord[]> {
    return this.http.get('/api/records')
      .pipe(map((response: any) => response))
      .pipe(map((result: HealthRecord[]) => {
          result.forEach(r => {
            r.date = new Date(r.date);
            r.doctor.person.birthDate = new Date(r.doctor.person.birthDate);
          });
          return result;
        }
      ))
      .pipe(map((result: HealthRecord[]) => {
        result.sort((a, b) => {
          if (a.date === b.date) {
            return 0;
          } else if (a.date > b.date) {
            return -1
          } else {
            return 1;
          }
        });
        return result;
      }));
  }

  public addNewRecord(record: HealthRecord): boolean {
    this.records.push(record);
    return true;
  }

}
