import {Component, Input, OnInit} from '@angular/core';
import {Patient} from "../../objects/patient.config";
import {HealthRecordService} from "../../services/health-record.service";
import {HealthRecord} from "../../objects/health-record.config";
import {ActivatedRoute} from "@angular/router";
import {PatientService} from "../../services/patient.service";

@Component({
  selector: 'app-patient-documentation',
  templateUrl: './patient-documentation.component.html',
  styleUrls: ['./patient-documentation.component.scss']
})
export class PatientDocumentationComponent implements OnInit {

  @Input() patient: Patient;
  records: HealthRecord[] = [];

  isNewRecordFormOpen: boolean = false;
  isInfoOpen: boolean = true;

  constructor(public recService: HealthRecordService,
              private patientService: PatientService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('id') || '';
    this.patientService.getPatientByCode(code).subscribe(
      (p: Patient) => {
        this.patient = p;
        this.loadData();
      }
    );
  }

  public onCloseReport(event: any) {
    this.isNewRecordFormOpen = false;
    if (event === true) {
      this.loadData();
    }
  }

  openReportForm() {
    this.isNewRecordFormOpen = true;
  }

  loadData() {
    this.recService.getAllRecordsByPatientCode(this.patient.code).subscribe((next: HealthRecord[]) => {this.records = next});
  }

  openInfo() {
    console.log('Hej')
    this.isInfoOpen = !this.isInfoOpen;
  }
}
