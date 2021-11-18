import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  filterForm = this.fb.group({
    birthNumber: [null],
    firstName: [null],
    lastName: [null],
    address: [null],
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
