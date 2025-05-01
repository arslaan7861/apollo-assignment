import { getFilteredDoctors } from "@/actions/getDoctors";
import DoctorCard from "@/components/DoctorCard";
import { DoctorsPagination } from "@/components/Pagination";
import { Suspense } from "react";

export default async function DoctorsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || "1", 10);
  const { doctors, total } = await getFilteredDoctors(params);

  if (doctors.length === 0)
    return (
      <main className="w-full h-full flex items-center justify-center">
        <div className="text-center text-gray-500 py-10">
          No doctors found matching your filters.
        </div>
      </main>
    );

  return (
    <main className="w-full md:w-auto grow md:h-full overflow-hidden pb-28">
      <section className="flex flex-col gap-3 h-full w-full max-h-full overflow-y-auto p-3">
        {doctors.map((doc, index) => (
          <DoctorCard key={`${doc.name}-${index}`} doctor={doc} />
        ))}
        <Suspense fallback={<></>}>
          <DoctorsPagination
            currentPage={currentPage}
            totalPages={Math.ceil(total / 10)}
          />
        </Suspense>
      </section>
    </main>
  );
}
