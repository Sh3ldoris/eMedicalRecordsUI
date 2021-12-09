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

  isNewRecordFormOpen: boolean = false;

  constructor(private sharedService: SharedService,
              public recService: HealthRecordService) { }

  ngOnInit(): void {
    this.patient = this.sharedService.data;
  }

  public onCloseReport(event: any) {
    this.isNewRecordFormOpen = false;
  }

  openReportForm() {
    this.isNewRecordFormOpen = true;
  }

}
