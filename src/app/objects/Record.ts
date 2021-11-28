export interface MedicalRecord {
    id: string
}

export interface Patient {
  birthNumber: string,
  firstName: string,
  lastName: string,
  address?: string,
  phone?: string,

  previousDiseases?: string,
  currentDiseases?: string,
  allergies?: string,

  familyStatus?: string,

}
