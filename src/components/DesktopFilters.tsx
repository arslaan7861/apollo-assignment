"use client";
import React from "react";
import { Button } from "./ui/button";

function DesktopFilters({
  filterData,
  resetFilter,
}: {
  filterData: Record<string, React.JSX.Element[]>;
  resetFilter: () => void;
}) {
  return (
    <div className="hidden md:block pb-10 h-full w-[400px] border-r max-h-full overflow-hidden">
      <article className="flex flex-col p-4 pt-0 w-full h-full max-h-full md:overflow-y-auto relative items-center gap-4">
        <h3 className="text-lg w-full flex justify-between sticky pt-4 top-0 bg-background font-semibold border-b-2">
          Filters
          <Button
            variant={"ghost"}
            onClick={resetFilter}
            className="text-primary hover:text-primary hover:bg-background font-semibold"
          >
            Clear all
          </Button>
        </h3>
        <section>
          <Button
            variant={"outline"}
            className="text-primary border-primary hover:text-primary"
          >
            {" "}
            Show doctors near me
          </Button>
        </section>
        {Object.keys(filterData).map((section) => (
          <section key={section} className="w-full">
            <h4 className="text-lg font-semibold">{section}</h4>
            <article className="p-4 space-y-3">{filterData[section]}</article>
          </section>
        ))}
      </article>
    </div>
  );
}

export default DesktopFilters;
