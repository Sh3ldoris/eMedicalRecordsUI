import { Injectable } from '@angular/core';
import { HealthRecord} from "../objects/health-record.config";
import {DoctorService} from "./doctor.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class HealthRecordService {

  constructor(private docsService: DoctorService,
              private http: HttpClient) { }

  public getAllRecordsByPatientCode(pc: string): Observable<HealthRecord[]> {
    return this.getAllMockedRecords(pc);
  }

  public addNewRecord(record: HealthRecord): Observable<any> {
    return this.addMockedRecord(record);
  }

  private getAllMockedRecords(pc: string): Observable<HealthRecord[]> {
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
          result = result.filter(r => r.patientCode === pc );
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

  private addMockedRecord(record: HealthRecord): Observable<any> {
    let data: any = record;
    data['code'] = uuid();
    return this.http.post('/api/records', data);
  }

}
