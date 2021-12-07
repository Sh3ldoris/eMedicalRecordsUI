import {Doctor} from "./user.config";

// export interface HealthRecord {
//   date: Date,
//   title: string,
//   doctor: string,
//   ambulance: string,
//   record: string
// }

export interface HealthRecord {
  patientCode: string,
  date: Date,
  title: string,
  doctor: Doctor,
  report: string
}
