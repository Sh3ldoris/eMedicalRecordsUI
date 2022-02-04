import {Person} from "./patient.config";

export interface Doctor {
  personalNumber: string
  person: Person,
  specification: string;
  ambulance: Ambulance;
}

export interface Ambulance {
  name: string,
  address: string
}
