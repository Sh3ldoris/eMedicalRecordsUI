import {Component, Input, OnInit} from '@angular/core';
import {Anamnesis, Patient, UrgentInfo} from "../../objects/patient.config";
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
  anamnesis: Anamnesis;
  familyState: string;
  occupation: string;
  alergies: string;

  isNewRecordFormOpen: boolean = false;
  isInfoOpen: boolean = false;
  isEditing: boolean = false;

  constructor(public recService: HealthRecordService,
              private patientService: PatientService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadPatient();
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
    if (this.isEditing) {
      this.resetAnamnesis();
      this.isEditing = false;
    }
    this.isInfoOpen = !this.isInfoOpen;
  }

  editAnamnesis() {
    if (this.isEditing) {
      this.patient.anamnesis = this.anamnesis;
      this.patient.urgentInfo.allergies = this.alergies;
      this.patient.person.occupation = this.occupation;
      this.patient.person.familyState = this.familyState;
      this.patientService.updatePatient(this.patient).subscribe(
        res => {
          this.loadPatient();
          this.isInfoOpen = false;
        }
      );
    }
    this.isEditing = !this.isEditing;
  }

  private loadPatient() {
    const code = this.route.snapshot.paramMap.get('id') || '';
    this.patientService.getPatientByCode(code).subscribe(
      (p: Patient) => {
        this.patient = p;
        this.resetAnamnesis();
        this.loadData();
      }
    );
  }

  private resetAnamnesis() {
    if (this.patient.anamnesis === undefined) {
      this.anamnesis = {
        currentDiseases: '',
        previousPeriod: '',
        pharmacologyHistory: '',
        abuses: '',
        physiologicalFunctions: '',
        gynecologicalHistory: '',
        familyAnamnesis: ''
      };
    } else {
      this.anamnesis = this.patient.anamnesis;
    }
    this.familyState = this.patient.person.familyState;
    this.occupation = this.patient.person.occupation;
    this.alergies = this.patient.urgentInfo.allergies;
  }
}
