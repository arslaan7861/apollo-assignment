"use client";
import React from "react";
import { Button } from "./ui/button";
import { Filter } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import AddDoctorDialog from "./Adddoctor";

function MobileFilters({
  filterData,
  resetFilter,
}: {
  filterData: Record<string, React.JSX.Element[]>;
  resetFilter: () => void;
}) {
  return (
    <div className="sm:hidden w-full px-4 flex justify-evenly pt-4 pb-2 border-b">
      <Filterdrawer filterData={filterData} resetFilter={resetFilter} />
      <AddDoctorDialog />
    </div>
  );
}

export default MobileFilters;

const Filterdrawer = ({
  filterData,
  resetFilter,
}: {
  filterData: Record<string, React.JSX.Element[]>;
  resetFilter: () => void;
}) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant={"outline"}
          className="text-primary bg-primary/10 border-primary"
        >
          <Filter />
          Filters
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="justify-between">Filters </DrawerTitle>
          <DrawerDescription asChild>
            <div className="max-h-[400px] overflow-y-auto">
              {Object.keys(filterData).map((section) => (
                <section key={section} className="w-full">
                  <h4 className="text-lg font-semibold">{section}</h4>
                  <article className="p-4 space-y-3">
                    {filterData[section]}
                  </article>
                </section>
              ))}
            </div>
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button variant={"destructive"} onClick={resetFilter}>
            Clear all
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
