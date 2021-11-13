import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(private httpService: HttpClient) {
    this.getTestData().subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: any) => {
        console.log(error);
      }
    );

  }

  ngOnInit(): void {

  }

  public getTestData(): any {
    return this.httpService.get<string>('api/hello');
  }

}
