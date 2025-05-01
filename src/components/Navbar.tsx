import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ChevronDown, CircleUser, LocationEdit, Search } from "lucide-react";
import Form from "next/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import AddDoctorDialog from "./Adddoctor";

function Navbar() {
  return (
    <div className="w-full space-y-2">
      <header className="w-full p-4 md:p-8 md:py-0 border border-border py-0 flex items-center justify-between">
        <article className="flex items-center gap-2 sm:gap-4">
          <div className=" px-4 flex items-center">
            <Avatar className="h-full w-auto rounded-none">
              <AvatarImage
                src="apollo.svg"
                className="h-[56px] w-auto object-contain"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <section className="flex h-full items-center gap-2">
            <LocationEdit className="h-5" />
            <article>
              <p className="font-light text-[10px] sm:text-xs">
                Select location
              </p>
              <strong className="text-xs">
                Select Address <ChevronDown className="inline-block h-6" />
              </strong>
            </article>
          </section>
        </article>
        <Form
          action="/"
          className="grow sm:flex items-center justify-center hidden"
        >
          <Input
            name="query"
            className="w-11/12"
            type="text"
            placeholder="Search Doctors, Specialities, Conditions etc."
          />
        </Form>
        <div className="flex items-center gap-4">
          <Button asChild className="hidden md:flex">
            <AddDoctorDialog />
          </Button>
          <Button variant={"outline"} className="text-primary border-primary">
            <CircleUser className="h-full aspect-square" />
            Login
          </Button>
        </div>
      </header>
      <article className="px-4">
        <Form
          action="/"
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            "grow flex items-center justify-center sm:hidden px-2 border py-0 gap-2 border-primary bg-primary/10 h-12"
          )}
        >
          <label htmlFor="query">
            <Search className="text-primary" />
          </label>
          <input
            name="query"
            id="query"
            className="grow border-0 shadow-none outline-none"
            type="text"
            placeholder="Search Doctors, Specialities, Conditions etc."
          />
        </Form>
      </article>
    </div>
  );
}

export default Navbar;
