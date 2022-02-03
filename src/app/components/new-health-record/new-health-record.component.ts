import {Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {HealthRecordService} from "../../services/health-record.service";
import {UserService} from "../../services/user.service";
import {DoctorService} from "../../services/doctor.service";
import {HealthRecord} from "../../objects/health-record.config";
import {Doctor} from "../../objects/user.config";
import {AssignedDiagnosis, Diagnosis} from "../../objects/diagnosis.config";
import {MatTable} from "@angular/material/table";
import {Observable} from 'rxjs';
import {Drg} from "../../objects/drg.config";

@Component({
  selector: 'app-new-health-record',
  templateUrl: './new-health-record.component.html',
  styleUrls: ['./new-health-record.component.scss']
})
export class NewHealthRecordComponent implements OnInit {

  @Output() close = new EventEmitter();
  @Input() patientCode: string;

  //@ViewChild(MatTable,{static:true}) table: MatTable<any>;
  @ViewChildren(MatTable) table !: QueryList<MatTable<string>>;

  value: any = null;
  localizationToBe: string = '';
  drgPriceToBe: number = 0;
  drgTypeToBe: any = null;

  doctor: Doctor;
  assignedDiagnosis: AssignedDiagnosis[] = [];
  assignedDrgs: Drg[] = [];
  filteredOptions: Observable<string[]>;
  diagnosis: Diagnosis[] = DIAG;
  drgTypes: string[] = TYPES;
  displayedColumns = ['code', 'localization', 'diagnosisName'];
  displayedColumnsDrg = ['type', 'price'];
  filteredDiagnosis: Diagnosis[] = this.diagnosis;
  filteredDrgTypes: string[] = this.drgTypes;

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

    if (this.assignedDrgs.length > 0) {
      console.log('Adding drgs');
      newRecord['drgs'] = this.assignedDrgs;
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

  addNewDrg() {
    const newDrg: Drg = {
      type: this.drgTypeToBe,
      price: this.drgPriceToBe
    }

    console.log(newDrg)
    this.assignedDrgs.push(newDrg);
    this.drgPriceToBe = 0;
    this.drgTypeToBe = null;
    this.table.last.renderRows();
  }

  filterArray(event : string) {
    this.filteredDiagnosis = [];
    this.diagnosis.forEach(value => {
      if (value.code.toLowerCase().includes(event.toLowerCase()) ||
          value.name.toLowerCase().includes(event.toLowerCase())) {
        this.filteredDiagnosis.push(value);
      }});
  }

  filterArrayDrg(event : string) {
    this.filteredDrgTypes = [];
    this.drgTypes.forEach(value => {
      if (value.toLowerCase().includes(event.toLowerCase())) {
        this.filteredDrgTypes.push(value);
      }});
  }

}

const TYPES: string[] = ['Diagnostický výkon', 'Zobrazovacia technika', 'Operačný výkon', 'Neoperačný výkon', 'Aplikácia liekov', 'Iné'];

const DIAG: Diagnosis[] = [
  {
    code: 'A00',
    name: 'Cholera'
  },
  {
    code: 'A01',
    name: 'Brušný týfus a paratýfusy'
  },
  {
    code: 'A02',
    name: 'Iné infekcie salmonelami'
  },
  {
    code: 'A03',
    name: 'Bacilová červienka (dyzentéria) – šigelóza'
  },
  {
    code: 'A04',
    name: 'Iné bakteriálne črevné infekcie'
  },
  {
    code: 'A05',
    name: 'Iné bakteriálne otravy potravinami'
  },
  {
    code: 'A06',
    name: 'Amébová červienka – amebóza'
  },
  {
    code: 'A07',
    name: 'Iné protozoárne črevné choroby'
  },
  {
    code: 'A08',
    name: 'Vírusové a inými organizmami vyvolané črevné infekcie'
  },
  {
    code: 'A09',
    name: 'Hnačka a gastroenteritída pravdepodobne infekčného pôvodu'
  },
  {
    code: 'A68',
    name: 'Návratné horúčky'
  },
  {
    code: 'A69',
    name: 'Iné spirochétové infekcie'
  },
  {
    code: 'A70',
    name: 'Infekcie Chlamydia psittaci'
  },
  {
    code: 'A71',
    name: 'Trachóm'
  }
];
