export interface doctor {
  name: string;
  experience_years: number;
  degrees: string[];
  languages: string[];
  specialty: string;
  consultation_fee: number;
  cashback: number;
  hospital: string;
  city: string;
  online_consult: boolean;
  hospital_visit: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
