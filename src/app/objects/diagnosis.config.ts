export interface AssignedDiagnosis {
  localization: string,
  diagnosis: Diagnosis
}

export interface Diagnosis {
  code: string,
  name: string
}
