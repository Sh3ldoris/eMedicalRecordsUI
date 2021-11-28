export interface MedicalRecord {
    id: string
}

export interface Patient {
  code: string,
  person: Person,
  urgentInfo: UrgentInfo
}

export interface Person {
  firstName: string,
  lastName: string,
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
  tetanus: Date,
  transplantation: string,
  bloodGroup: string
}
