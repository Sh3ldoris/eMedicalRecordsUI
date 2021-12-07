import { Component, Input, OnInit } from '@angular/core';
import {HealthRecord} from "../../objects/health-record.config";

@Component({
  selector: 'app-health-record-detail',
  templateUrl: './health-record-detail.component.html',
  styleUrls: ['./health-record-detail.component.scss']
})
export class HealthRecordDetailComponent implements OnInit {

  @Input() record: HealthRecord;

  constructor() { }

  ngOnInit(): void {
  }

}
