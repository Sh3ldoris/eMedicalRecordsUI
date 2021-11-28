import { Component, OnInit } from '@angular/core';
import {MedicalRecord, Patient} from "../../objects/Record";

@Component({
  selector: 'app-records-list',
  templateUrl: './records-list.component.html',
  styleUrls: ['./records-list.component.scss']
})
export class RecordsListComponent implements OnInit {

  public records: MedicalRecord[] = [{id: 'fsdfs'}, {id: 'fffffd'}, {id: 'kjku'}];
  public patients: Patient[] = [
    {
      birthDate: new Date(),
      birthNumber: '981010/4029',
      firstName: 'Adam',
      lastName: 'Lány',
      address: 'Zábrežná 203/8, Predajná',
      phone: '+421944911835',
      previousDiseases: 'Čierny kašeľ, kiahne',
      currentDiseases: 'Idiopatická myokarditída',
      allergies: 'Trávy, prach, kvety',
      familyStatus: 'Slobodný'
    },
    {
      birthDate: new Date(),
      birthNumber: '981010/4029',
      firstName: 'Jozo',
      lastName: 'Trapny',
      address: 'Zábrežná 203/8, Predajná',
      phone: '+421944911835',
      previousDiseases: 'Čierny kašeľ, kiahne',
      currentDiseases: 'Idiopatická myokarditída',
      allergies: 'Trávy, prach, kvety',
      familyStatus: 'Slobodný'
    },
    ];

  constructor() { }

  ngOnInit(): void {
  }

}
