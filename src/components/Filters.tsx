"use client";
import React, { useEffect, useState } from "react";
import CheckboxILabel from "./checkboxILabel";
import DesktopFilters from "./DesktopFilters";
import MobileFilters from "./MobileFilters";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
export const defaultFilterState = {
  experience: [] as string[],
  fee: [] as string[],
  language: [] as string[],
  facility: [] as string[],
  mode: {
    online_consult: false,
    hospital_visit: false,
  },
};

function Filters() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const UpdateFiltersInUrl = () => {
    return (selectedFilters: typeof defaultFilterState) => {
      if (selectedFilters.experience.length) {
        params.set("experience", selectedFilters.experience.join(","));
      }

      if (selectedFilters.fee.length) {
        params.set("fee", selectedFilters.fee.join(","));
      }

      if (selectedFilters.language.length) {
        params.set("language", selectedFilters.language.join(","));
      }

      if (selectedFilters.facility.length) {
        params.set("facility", selectedFilters.facility.join(","));
      }

      if (selectedFilters.mode.online_consult) {
        params.set("online_consult", "true");
      }

      if (selectedFilters.mode.hospital_visit) {
        params.set("hospital_visit", "true");
      }

      router.push(`${pathname}?${params.toString()}`);
    };
  };
  const updateUrlFilters = UpdateFiltersInUrl();
  const router = useRouter();

  const [selectedFilters, setSelectedFilters] =
    useState<typeof defaultFilterState>(defaultFilterState);
  const resetFilter = () => {
    setSelectedFilters(defaultFilterState); // Reset filters to default
    const params = new URLSearchParams();
    router.push(`${pathname}?${params.toString()}`); // Clear URL parameters
  };
  useEffect(() => {
    updateUrlFilters(selectedFilters);
  }, [selectedFilters]);

  useEffect(() => {
    const experience = searchParams.get("experience")?.split(",") || [];
    const fee = searchParams.get("fee")?.split(",") || [];
    const language = searchParams.get("language")?.split(",") || [];
    const facility = searchParams.get("facility")?.split(",") || [];
    const online_consult = searchParams.get("online_consult") === "true";
    const hospital_visit = searchParams.get("hospital_visit") === "true";

    setSelectedFilters({
      experience,
      fee,
      language,
      facility,
      mode: {
        online_consult,
        hospital_visit,
      },
    });
  }, [searchParams]);
  const experienceRanges = ["0-5", "6-10", "11-16", "16-above"];

  const priceRanges = ["100-500", "500-1000", "1000-above"];

  const languages = [
    "English",
    "Hindi",
    "Telugu",
    "Punjabi",
    "Bengali",
    "Marathi",
    "Urdu",
    "Gujarati",
    "Tamil",
    "Kannada",
    "Oriya",
    "Persian",
    "Assamese",
  ];

  const clinicTypes = ["Apollo Hospital", "Other Clinics"];
  const handleCheck = (
    category: Exclude<keyof typeof selectedFilters, "mode">, // exclude boolean mode
    value: string,
    checked: boolean
  ) => {
    setSelectedFilters((prev) => {
      const updatedValues = checked
        ? [...prev[category], value]
        : prev[category].filter((item) => item !== value);

      return {
        ...prev,
        [category]: updatedValues,
      };
    });
  };
  const handleBooleanCheck = (
    field: keyof (typeof selectedFilters)["mode"],
    checked: boolean
  ) => {
    setSelectedFilters((prev) => ({
      ...prev,
      mode: {
        ...prev.mode,
        [field]: checked,
      },
    }));
  };

  const filterData: Record<string, React.JSX.Element[]> = {
    "Mode of consult": [
      <CheckboxILabel
        key={"hospital_visit"}
        id="hospital_visit"
        label="Hospital Visit"
        checked={selectedFilters.mode.hospital_visit}
        onCheckedChange={(c: boolean) =>
          handleBooleanCheck("hospital_visit", c)
        }
      />,
      <CheckboxILabel
        key={"online_consult"}
        id="online_consult"
        label="Online Consult"
        checked={selectedFilters.mode.online_consult}
        onCheckedChange={(checked) =>
          handleBooleanCheck("online_consult", checked)
        }
      />,
    ],
    "Experience (In Years)": experienceRanges.map((range) => (
      <CheckboxILabel
        key={range}
        id={range}
        label={range}
        checked={selectedFilters.experience.includes(range)}
        onCheckedChange={(checked) => handleCheck("experience", range, checked)}
      />
    )),
    "Fees (In Rupees)": priceRanges.map((range) => (
      <CheckboxILabel
        key={range}
        id={range}
        label={range}
        checked={selectedFilters.fee.includes(range)}
        onCheckedChange={(checked) => handleCheck("fee", range, checked)}
      />
    )),
    Language: languages.map((lang) => (
      <CheckboxILabel
        key={lang}
        id={lang}
        label={lang}
        checked={selectedFilters.language.includes(lang)}
        onCheckedChange={(checked) => handleCheck("language", lang, checked)}
      />
    )),
    Facility: clinicTypes.map((type) => (
      <CheckboxILabel
        key={type}
        id={type}
        label={type}
        checked={selectedFilters.experience.includes(type)}
        onCheckedChange={(checked) => handleCheck("facility", type, checked)}
      />
    )),
  };

  return (
    <>
      <DesktopFilters resetFilter={resetFilter} filterData={filterData} />
      <MobileFilters resetFilter={resetFilter} filterData={filterData} />
    </>
  );
}

export default Filters;
