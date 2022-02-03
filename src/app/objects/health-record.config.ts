import {Doctor} from "./user.config";
import {AssignedDiagnosis} from "./diagnosis.config";
import {Drg} from "./drg.config";

export interface HealthRecord {
  patientCode: string,
  date: Date,
  title: string,
  doctor: Doctor,
  report: string,
  diagnosis?: AssignedDiagnosis[],
  drgs?: Drg[]
}
