import { doctor } from "@/lib/types";
import { Schema, model, Document, models } from "mongoose";

// 1. Define the TypeScript interface
export interface IDoctor extends Document, doctor {}

// 2. Define the Mongoose schema
const DoctorSchema = new Schema<IDoctor>(
  {
    name: { type: String, required: true },
    experience_years: { type: Number, required: true, min: 0 },
    degrees: { type: [String], required: true },
    languages: { type: [String], required: true },
    specialty: { type: String, required: true },
    consultation_fee: { type: Number, required: true, min: 0 },
    cashback: { type: Number, required: true, min: 0 },
    hospital: { type: String, required: true },
    city: { type: String, required: true },
    online_consult: { type: Boolean, default: false },
    hospital_visit: { type: Boolean, default: false },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// 3. Export the model
const Doctor = models.Doctor || model<IDoctor>("Doctor", DoctorSchema);
export default Doctor;
