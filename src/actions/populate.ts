"use server";

import connectDB from "@/DB";
import Doctor from "@/DB/doctor";
import { readFile } from "fs/promises";
import path from "path";

export async function seedDoctors() {
  try {
    await connectDB();
    // __dirname is not available in ESM/Next.js; use import.meta.url workaround
    const filePath = path.join(process.cwd(), "src", "lib", "doctors.json");
    const data = await readFile(filePath, "utf-8");
    const doctors = JSON.parse(data);

    if (!Array.isArray(doctors)) throw new Error("Invalid data format");

    await Doctor.deleteMany({});
    await Doctor.insertMany(doctors);
    console.log(`${doctors.length} doctors inserted successfully.`);

    return {
      success: true,
      message: `${doctors.length} doctors inserted successfully.`,
    };
  } catch (error) {
    console.error("Database Seeding Error:", error);
    return {
      success: false,
      message: "Unknown error occurred.",
    };
  }
}
