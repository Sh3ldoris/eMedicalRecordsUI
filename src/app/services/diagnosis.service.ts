import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Diagnosis} from "../objects/diagnosis.config";

@Injectable({
  providedIn: 'root'
})
export class DiagnosisService {

  private diagnosis: Diagnosis[] = [];

  constructor(private http: HttpClient) { }

  public getAllDiagnosis(): Diagnosis[] {
    return this.diagnosis;
  }
}
