import {Component, Input, OnInit} from '@angular/core';
import {Patient} from "../../objects/Record";

@Component({
  selector: 'app-record-detail',
  templateUrl: './record-detail.component.html',
  styleUrls: ['./record-detail.component.scss']
})
export class RecordDetailComponent implements OnInit {

  @Input() patient: Patient;

  constructor() { }

  ngOnInit(): void {
  }

}
