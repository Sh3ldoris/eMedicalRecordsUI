import {addExportToModule} from "@angular/cdk/schematics";
import {Person} from "./patient.config";

export interface User {
  personalNumber: string;
  password: string;
  name: string;
  specification: string;
  ambulance?: Ambulance;
}

export interface Doctor {
  personalNumber: string,
  password: string,
  person: Person,
  specification: string;
  ambulance: Ambulance;
}

export interface Ambulance {
  name: string,
  address: string
}
