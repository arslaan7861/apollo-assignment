"use server";

import connectDB from "@/DB";
import Doctor from "@/DB/doctor";
import { doctor } from "@/lib/types";

export async function addDoctor(data: doctor) {
  try {
    console.log({ data });

    await connectDB();
    await Doctor.insertOne(data);
    return { success: true };
  } catch (err) {
    console.error("Error creating doctor:", err);
    return { success: false, error: "Failed to add doctor." };
  }
}
