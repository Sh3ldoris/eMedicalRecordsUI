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
    const result = this.records.filter(r => r.patientCode === pc);
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
  }

  public addNewRecord(record: HealthRecord): boolean {
    this.records.push(record);
    return true;
  }

}
