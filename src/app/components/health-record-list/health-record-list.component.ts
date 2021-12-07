import {Component, Input, OnInit} from '@angular/core';
import {HealthRecord} from "../../objects/health-record.config";

@Component({
  selector: 'app-health-record-list',
  templateUrl: './health-record-list.component.html',
  styleUrls: ['./health-record-list.component.scss']
})
export class HealthRecordListComponent implements OnInit {

  @Input() records: HealthRecord[] = [];/* = [
    {
      date: new Date(),
      title: 'Obvodná prehliadka 2021',
      doctor: 'MuDr Adam Lány',
      ambulance: 'Obvodná ambulancia Predajná',
      record: 'Prehliadka je v poriadku, vykonane vsetky potrebne ukony pre zistenie zdravotneho stavu pacienta. Krvny tlak v poriadku, vyska a vaha tak isto'
    },
    {
      date: new Date(),
      title: 'Odber krvi 2021',
      doctor: 'MuDr Soňa Frčková',
      ambulance: 'Obvodná ambulancia Predajná',
      record: 'Prehliadka je v poriadku, vykonane vsetky potrebne ukony pre zistenie zdravotneho stavu pacienta. Krvny tlak v poriadku, vyska a vaha tak isto'
    }
  ];*/

  step = -1;

  constructor() { }

  ngOnInit(): void {
  }

  setStep(index: number) {
    this.step = index;
  }

}
