import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {HealthRecordService} from "../../services/health-record.service";
import {UserService} from "../../services/user.service";
import {DoctorService} from "../../services/doctor.service";
import {HealthRecord} from "../../objects/health-record.config";
import {Doctor} from "../../objects/user.config";
import {AssignedDiagnosis, Diagnosis} from "../../objects/diagnosis.config";
import {MatTable} from "@angular/material/table";
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-new-health-record',
  templateUrl: './new-health-record.component.html',
  styleUrls: ['./new-health-record.component.scss']
})
export class NewHealthRecordComponent implements OnInit {

  @Output() close = new EventEmitter();
  @Input() patientCode: string;

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  value: any = null;
  localizationToBe: string = '';

  doctor: Doctor;
  assignedDiagnosis: AssignedDiagnosis[] = [];
  filteredOptions: Observable<string[]>;
  diagnosis: Diagnosis[] = [] = [
    {
      code: 'A001',
      name: 'Choroba'
    },
    {
      code: 'A002',
      name: 'Choroba2'
    },
    {
      code: 'A003',
      name: 'Choroba3'
    },
    {
      code: 'B001',
      name: 'Choroba4'
    }
  ]
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
              private userService: UserService,
              private doctorService: DoctorService) { }

  ngOnInit(): void {
    this.doctor = this.doctorService.getDoctorByPersonalNumber(this.userService.getUser().personalNumber);
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
    this.table.renderRows();
  }

  filterArray(event : string) {
    this.filteredDiagnosis = [];
    this.diagnosis.forEach(value => {
      if (value.code.toLowerCase().includes(event.toLowerCase()) ||
          value.name.toLowerCase().includes(event.toLowerCase())) {
        this.filteredDiagnosis.push(value);
      }});
  }

}
