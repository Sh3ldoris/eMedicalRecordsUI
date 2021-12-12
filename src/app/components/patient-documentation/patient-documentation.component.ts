import {Component, Input, OnInit} from '@angular/core';
import {Patient} from "../../objects/patient.config";
import {SharedService} from "../../services/shared.service";
import {HealthRecordService} from "../../services/health-record.service";
import {HealthRecord} from "../../objects/health-record.config";

@Component({
  selector: 'app-patient-documentation',
  templateUrl: './patient-documentation.component.html',
  styleUrls: ['./patient-documentation.component.scss']
})
export class PatientDocumentationComponent implements OnInit {

  @Input() patient: Patient;
  records: HealthRecord[] = [];

  isNewRecordFormOpen: boolean = false;

  constructor(private sharedService: SharedService,
              public recService: HealthRecordService) { }

  ngOnInit(): void {
    this.patient = this.sharedService.data;
    this.loadData();
  }

  public onCloseReport(event: any) {
    this.isNewRecordFormOpen = false;
  }

  openReportForm() {
    this.isNewRecordFormOpen = true;
  }

  loadData() {
    this.recService.getAllRecordsByPatientCode(this.patient.code).subscribe((next: HealthRecord[]) => {this.records = next});
  }

}
