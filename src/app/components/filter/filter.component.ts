import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Filter, FilterItem} from "../../objects/filter.config";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Output() apply = new EventEmitter();

  public config: Filter= {
    items: [
      {
        id: 'birth-number',
        label: 'Rodné číslo',
        type: 'text',
        value: '',
      },
      {
        id: 'name',
        label: 'Meno',
        type: 'text',
        value: '',
      },
      {
        id: 'lastName',
        label: 'Priezvisko',
        type: 'text',
        value: '',
      },
      {
        id: 'address',
        label: 'Adresa',
        type: 'text',
        value: '',
      },
    ],
  };

  filterForm = this.fb.group({
    birthNumber: [null],
    firstName: [null],
    lastName: [null],
    address: [null],
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  /**
   * Apply filter for fetching data
   */
  applyFilter(): void {
    const query = this.setQueryFromFields();

    this.apply.emit(query);
  }

  printFoo(item: FilterItem) {
    console.log(item.value);
  }

  /**
   * Creates query for filtering data and returns it
   * @private
   */
  private setQueryFromFields(): any {

  }

}
