import {Doctor} from "./user.config";
import {AssignedDiagnosis} from "./diagnosis.config";

export interface HealthRecord {
  patientCode: string,
  date: Date,
  title: string,
  doctor: Doctor,
  report: string,
  diagnosis?: AssignedDiagnosis[]
}
