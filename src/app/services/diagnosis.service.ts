import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Diagnosis} from "../objects/diagnosis.config";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DiagnosisService {

  constructor(private http: HttpClient) { }

  public getAllDiagnosis(): Observable<Diagnosis[]> {
    return this.http.get('/api/diagnosis')
      .pipe(map((response: any) => response))
      .pipe(map((result: Diagnosis[]) => {
          return result;
        }
      ));
  }
}
