import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import generateDoctorExtras from "@/lib/getRandomdata";
import { doctor } from "@/lib/types";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

export interface Doctor {
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
  // Additional fields from the image
  rating_percentage?: number;
  patient_count?: number;
  profile_image?: string;
  online_slot_time?: string;
  visit_slot_time?: string;
  visit_fee?: number; // If different from consultation_fee
}

export default function DoctorCard({ doctor }: { doctor: doctor }) {
  const {
    online_slot_time,
    patient_count,
    profile_image,
    rating_percentage,
    visit_fee,
    visit_slot_time,
  } = generateDoctorExtras();
  return (
    <Card className="p-4 border-t border-b border-gray-200 flex flex-col md:flex-row gap-4">
      <div className="flex flex-row gap-4 flex-1">
        {/* Doctor Image and Basic Info */}
        <div className="flex-shrink-0">
          <div className="relative w-16 h-16 rounded-full overflow-hidden">
            <Image
              src={profile_image || "/placeholder.svg?height=64&width=64"}
              alt={doctor.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          {/* Doctor Name and Verification */}
          <div className="flex items-center gap-1">
            <h3 className="font-medium text-gray-900">{doctor.name}</h3>
            <Badge
              variant="outline"
              className="h-5 rounded-full border-blue-400"
            >
              <CheckCircle className="h-3 w-3 text-blue-500 mr-1" />
            </Badge>
          </div>

          {/* Specialty */}
          <p className="text-sm text-gray-600">{doctor.specialty}</p>

          {/* Experience and Degrees */}
          <div className="text-xs text-gray-500 mt-1">
            <span className="font-medium">{doctor.experience_years} YEARS</span>{" "}
            • {doctor.degrees.join(", ")}
          </div>

          {/* Location */}
          <p className="text-xs text-gray-500 mt-1">{doctor.city}</p>

          {/* Hospital */}
          <p className="text-xs text-gray-500 mt-1">{doctor.hospital}</p>

          {/* Ratings if available */}
          {rating_percentage && (
            <div className="flex items-center gap-1 mt-1">
              <span className="text-xs bg-green-100 text-green-800 px-1 rounded">
                {rating_percentage}%
              </span>
              <span className="text-xs text-gray-500">
                ({patient_count || 0} Patients)
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Pricing and Booking Section */}
      <div className="flex justify-center gap-2 items-end">
        {/* Online Consultation */}
        {doctor.online_consult && (
          <div className="flex flex-col items-center ">
            <div className=" sm:text-lg font-semibold text-gray-900">
              ₹{doctor.consultation_fee}
            </div>
            {doctor.cashback > 0 && (
              <div className="text-xs text-orange-500">
                <span className="bg-orange-100 px-1 py-0.5 rounded">
                  ₹{doctor.cashback} Cashback
                </span>
              </div>
            )}
            <Button
              variant="outline"
              className="mt-2 text-blue-600 border-blue-600 hover:bg-blue-50 p-2 h-min"
            >
              <p className="text-sm">
                Consult Online
                <span className="block text-[10px] font-normal mt-0.5">
                  {online_slot_time || "Today"}
                </span>
              </p>
            </Button>
          </div>
        )}

        {/* Hospital Visit */}
        {doctor.hospital_visit && (
          <div className="flex flex-col items-center ">
            <div className="text-lg font-semibold text-gray-900">
              ₹{visit_fee || doctor.consultation_fee}
            </div>
            {!doctor.cashback && visit_fee && (
              <div className="text-xs text-gray-500">No Booking Fees</div>
            )}
            <Button className="mt-2 bg-teal-600  hover:bg-teal-700 text-white h-min">
              <p>
                Visit Doctor
                <span className="block text-[10px] sm:text-xs font-normal mt-0.5">
                  {visit_slot_time || "Today"}
                </span>
              </p>
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
