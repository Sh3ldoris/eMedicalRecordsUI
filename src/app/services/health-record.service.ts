import { Injectable } from '@angular/core';
import { HealthRecord} from "../objects/health-record.config";
import {DoctorService} from "./doctor.service";

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

  constructor(private docsService: DoctorService) { }

  public getAllRecordsByPatientCode(pc: string) : HealthRecord[] {
    return this.records.filter(r => r.patientCode === pc);
  }

}
