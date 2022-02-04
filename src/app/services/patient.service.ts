import {Injectable} from '@angular/core';
import {Patient} from "../objects/patient.config";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from 'rxjs/operators';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {
  }

  public getAllPatient(): Observable<Patient[]> {
      return this.getAllMockedPatients();
  }

  public getAllPatientByDoctor(personalNumber: string): Observable<Patient[]> {
    return this.getMockedPatientsByDoctor(personalNumber);
  }

  public getPatientsByFilter(
    filter: {
      address: string,
      birthNumber: string,
      lastName: string,
      name: string
  }): Observable<Patient[]> {
    return this.http.post('/api/patients/filtered', filter, {headers: this.headers})
      .pipe(map((response: any) => response))
      .pipe(map((result: Patient[]) => {
        console.log(result);
          result.forEach(p => {
            p.person.birthDate = new Date(p.person.birthDate);
            if (p.urgentInfo.tetanus !== null) {
              p.urgentInfo.tetanus = new Date(p.urgentInfo.tetanus?.toString() ? p.urgentInfo.tetanus?.toString() : '');
            }
          });
          return result;
        }
      ));
  };

  public getPatientByCode(code: string): Observable<Patient> {
    return this.getMockedPatientByCode(code);
  }

  public saveNewPatient(p: Patient): Observable<any> {
    return this.http.post('/api/patients', p, {headers: this.headers});
  }

  public updatePatient(patient: Patient): Observable<Patient> {
    return this.http.put('/api/patients/', patient, {headers: this.headers})
      .pipe(map((response: any) => response))
      .pipe(map((result: Patient) => {
        result.person.birthDate = new Date(result.person.birthDate);
        if (result.urgentInfo.tetanus !== null) {
          result.urgentInfo.tetanus = new Date(result.urgentInfo.tetanus?.toString() ? result.urgentInfo.tetanus?.toString() : '');
        }
        return result;
      }));
  }

  private getAllMockedPatients(): Observable<Patient[]> {
    return this.http.get('/api/patients')
      .pipe(map((response: any) => response))
      .pipe(map((result: Patient[]) => {
          result.forEach(p => {
            p.person.birthDate = new Date(p.person.birthDate);
            if (p.urgentInfo.tetanus !== null) {
              p.urgentInfo.tetanus = new Date(p.urgentInfo.tetanus?.toString() ? p.urgentInfo.tetanus?.toString() : '');
            }
          });
          return result;
        }
      ));
  }

  private getMockedPatientsByDoctor(personalNumber: string): Observable<Patient[]> {
    return this.http.get('/api/patients/doctor/' + personalNumber)
      .pipe(map((response: any) => response))
      .pipe(map((result: Patient[]) => {
          result = result.filter(p => p.canAccess && p.canAccess.includes(personalNumber));
          result.forEach(p => {
            p.person.birthDate = new Date(p.person.birthDate);
            if (p.urgentInfo.tetanus !== null) {
              p.urgentInfo.tetanus = new Date(p.urgentInfo.tetanus?.toString() ? p.urgentInfo.tetanus?.toString() : '');
            }
          });
          return result;
        }
      ));
  }

  private getMockedPatientByCode(code: string): Observable<Patient> {
      return this.http.get('/api/patients/' + code)
        .pipe(map((response: any) => response))
        .pipe(map((result: Patient) => {
          console.log(result);
          result.person.birthDate = new Date(result.person.birthDate);
          if (result.urgentInfo.tetanus !== null) {
            result.urgentInfo.tetanus = new Date(result.urgentInfo.tetanus?.toString() ? result.urgentInfo.tetanus?.toString() : '');
          }
          return result;
        }
      ));
  }

}
