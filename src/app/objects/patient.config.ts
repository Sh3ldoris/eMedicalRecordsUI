import {Doctor} from "./user.config";

export interface MedicalRecord {
    id: string
}

export interface Patient {
  code: string,
  insurance: string,
  person: Person,
  urgentInfo: UrgentInfo,
  anamnesis?: Anamnesis,
  doctor?: Doctor,
  canAccess?: string[]
}

export interface Person {
  firstName: string,
  lastName: string,
  gender: 'MALE' | 'FEMALE',
  birthName?: string,
  birthNumber: string,
  birthDate: Date,

  address?: string,
  phone?: string,

  familyState: string,
  occupation: string
}

export interface UrgentInfo {
  allergies: string,
  otherRisks: string,
  permanentMedicals: string,
  infections: string,
  organDonation: string,
  height: number,
  weight: number,
  tetanus?: Date,
  transplantation: string,
  bloodGroup: string
}

export interface Anamnesis {
  currentDiseases: string,
  previousPeriod: string,
  pharmacologyHistory: string,
  abuses: string,
  physiologicalFunctions: string,
  gynecologicalHistory: string,

  familyAnamnesis: string
}

export interface Insurance {
  insuranceCode: string
}
