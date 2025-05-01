import connectDB from "@/DB";
import Doctor from "@/DB/doctor";
import { doctor } from "@/lib/types";

export async function getFilteredDoctors(
  searchParams: Record<string, string>
): Promise<{ doctors: doctor[]; total: number }> {
  const {
    experience,
    fee,
    language,
    facility,
    online_consult,
    hospital_visit,
    page = "1",
    limit = "10",
  } = searchParams;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filter: any = {};

  if (experience) {
    const ranges = experience.split(",");
    filter.$or = ranges.map((range) => {
      const [minStr, maxStr] = range.split("-");
      const min = Number(minStr.trim());
      const isAbove = maxStr?.trim().toLowerCase() === "above";
      if (isAbove) {
        return { experience_years: { $gte: min } };
      }
      const max = Number(maxStr);
      return { experience_years: { $gte: min, $lte: max } };
    });
  }

  // Fee filter (range strings like "100-500" or "1000-above")
  if (fee) {
    const ranges = fee.split(",");
    filter.$or = [
      ...(filter.$or || []),
      ...ranges.map((range) => {
        const [minStr, maxStr] = range.split("-");
        const min = Number(minStr.trim());
        const isAbove = maxStr?.trim().toLowerCase() === "above";
        if (isAbove) {
          return { consultation_fee: { $gte: min } };
        }
        const max = Number(maxStr);
        return { consultation_fee: { $gte: min, $lte: max } };
      }),
    ];
  }

  // Language filter
  if (language) {
    const langs = language.split(",");
    filter.languages = { $in: langs };
  }

  // Facility filter
  if (facility) {
    const hospitals = facility.split(",");
    filter.hospital = { $in: hospitals };
  }

  // Booleans
  if (online_consult === "true") {
    filter.online_consult = true;
  }
  if (hospital_visit === "true") {
    filter.hospital_visit = true;
  }

  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const skip = (pageNum - 1) * limitNum;

  await connectDB();

  const [doctors, total] = await Promise.all([
    Doctor.find(filter, {
      _id: 0,
      createdAt: 0,
      updatedAt: 0,
    })
      .skip(skip)
      .limit(limitNum),
    Doctor.countDocuments(filter),
  ]);

  return { doctors, total };
}
