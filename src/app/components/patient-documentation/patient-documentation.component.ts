import {Component, Input, OnInit} from '@angular/core';
import {Patient} from "../../objects/patient.config";
import {SharedService} from "../../services/shared.service";
import {HealthRecordService} from "../../services/health-record.service";

@Component({
  selector: 'app-patient-documentation',
  templateUrl: './patient-documentation.component.html',
  styleUrls: ['./patient-documentation.component.scss']
})
export class PatientDocumentationComponent implements OnInit {

  @Input() patient: Patient;

  constructor(private sharedService: SharedService,
              public recService: HealthRecordService) { }

  ngOnInit(): void {
    this.patient = this.sharedService.data;
    if (this.sharedService.isLoadingContent) {
      this.sharedService.isLoadingContent = false;
    }

    const array : {id: string, value: string}[] =  [
      {
        id: 'name',
        value: 'Adko'
      },
      {
        id: 'position',
        value: 'junior coder'
      }
    ];

    let example: any = {};

    array.forEach(item => {
      example[item.id] = item.value;
    });

    console.log(example);

  }

}
