import {Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {HealthRecordService} from "../../services/health-record.service";
import {DoctorService} from "../../services/doctor.service";
import {HealthRecord} from "../../objects/health-record.config";
import {Doctor} from "../../objects/user.config";
import {AssignedDiagnosis, Diagnosis} from "../../objects/diagnosis.config";
import {MatTable} from "@angular/material/table";
import {Observable} from 'rxjs';
import {DiagnosisService} from "../../services/diagnosis.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-new-health-record',
  templateUrl: './new-health-record.component.html',
  styleUrls: ['./new-health-record.component.scss']
})
export class NewHealthRecordComponent implements OnInit {

  @Output() close = new EventEmitter();
  @Input() patientCode: string;

  @ViewChildren(MatTable) table !: QueryList<MatTable<string>>;

  value: any = null;
  localizationToBe: string = '';

  doctor: Doctor;
  assignedDiagnosis: AssignedDiagnosis[] = [];
  filteredOptions: Observable<string[]>;
  diagnosis: Diagnosis[] = [];
  displayedColumns = ['code', 'localization', 'diagnosisName'];
  filteredDiagnosis: Diagnosis[] = this.diagnosis;

  reportForm = this.fb.group({
    name: [null, Validators.required],
    report: [null, Validators.required]
  });
  name: string;
  report: string;

  constructor(private fb: FormBuilder,
              private recordService: HealthRecordService,
              private auth: AuthService,
              private doctorService: DoctorService,
              private diagnosisService: DiagnosisService) { }

  ngOnInit(): void {
    this.loadDiagnosis();
    this.loadDoctor();
  }

  confirm() {
    for (const i in this.reportForm.controls) {
      this.reportForm.controls[i].markAsDirty();
    }
    const newRecord : HealthRecord = {
      patientCode: this.patientCode,
      date: new Date(),
      title: this.reportForm.get('name')?.value,
      doctor: this.doctor,
      report: this.reportForm.get('report')?.value
    };

    if (this.assignedDiagnosis.length > 0) {
      newRecord['diagnosis'] = this.assignedDiagnosis;
    }

    this.recordService.addNewRecord(newRecord).subscribe(
      (data: any) => {
        this.close.emit(true);
      }
    );
  }

  addNewDiagnosis() {
    const newDiagnosis: AssignedDiagnosis = {
      localization: this.localizationToBe,
      diagnosis: this.value
    };
    this.assignedDiagnosis.push(newDiagnosis);
    this.value = null;
    this.localizationToBe = '';
    this.table.first.renderRows();
  }

  filterArray(event : string) {
    this.filteredDiagnosis = [];
    this.diagnosis.forEach(value => {
      if (value.code.toLowerCase().includes(event.toLowerCase()) ||
          value.name.toLowerCase().includes(event.toLowerCase())) {
        this.filteredDiagnosis.push(value);
      }});
  }

  private loadDiagnosis() {
      this.diagnosisService.getAllDiagnosis().subscribe((next: Diagnosis[]) => {
        this.diagnosis = next;
        this.filteredDiagnosis = next;
      });
  }

  private loadDoctor() {
    this.doctorService.getDoctorByPersonalNumber(this.auth.getLoggedPersonalNumber())
      .subscribe(
        (data: Doctor) => {
          this.doctor = data;
        }
      )
  }

}
