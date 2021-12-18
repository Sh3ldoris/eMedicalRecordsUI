import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {HealthRecord} from "../../objects/health-record.config";

@Component({
  selector: 'app-health-record-list',
  templateUrl: './health-record-list.component.html',
  styleUrls: ['./health-record-list.component.scss']
})
export class HealthRecordListComponent implements OnInit, OnChanges {

  @Input() records: HealthRecord[] = [];

  step = -1;

  constructor() { }

  ngOnInit(): void {
  }

  setStep(index: number) {
    this.step = index;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.step = -1;
  }

}
