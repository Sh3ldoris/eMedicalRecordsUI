import {Injectable} from '@angular/core';
import {Doctor} from "../objects/user.config";
import {PersonService} from "./person.service";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private personService: PersonService,
              private http: HttpClient) { }

  public getDoctorByPersonalNumber(pn: string) : Observable<Doctor> {
    return this.getDoctorFromServer(pn);
  }

  private getDoctorFromServer(pn: string): Observable<Doctor> {
    return this.http.get('/api/doctors/' + pn)
      .pipe(map((response: any) => response))
      .pipe(map((result: Doctor) => {
          result.person.birthDate = new Date(result.person.birthDate);
          return result;
        }
      ));
  }
}
