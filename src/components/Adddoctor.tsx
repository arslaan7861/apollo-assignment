"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addDoctor } from "@/actions/addDoctor"; // server action
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function AddDoctorDialog({show}:{show?: boolean}) {
  const [formData, setFormData] = useState({
    name: "Dr. John Doe",
    experience_years: 5, // changed to number
    degrees: "MBBS, MD", // array of strings
    languages: "English,Hindi", // array of strings
    specialty: "General Physician",
    consultation_fee: 500, // changed to number
    cashback: 50, // changed to number
    hospital: "City Hospital",
    city: "Delhi",
    online_consult: true,
    hospital_visit: true,
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    const newValue =
      type === "checkbox" && e.target instanceof HTMLInputElement
        ? e.target.checked
        : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = async () => {
    const id = toast.loading("Adding new dcotor");
    try {
      const degrees = formData.degrees.split(",");
      const languages = formData.languages.split(",");

      console.log(formData);

      const resp = await addDoctor({ ...formData, degrees, languages });
      if (resp.error) return toast.error(resp.error, { id: id });
      toast.success("Added doctor succesfully");
    } catch (error) {
      toast.error("Error creating doctor", { id: id });
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger  asChild>
        <Button className=cn(show&&"hidden")>Add Doctor</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Doctor</DialogTitle>
        </DialogHeader>

        <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
          {[
            { label: "Name", name: "name" },
            { label: "Experience (Years)", name: "experience_years" },
            { label: "Degrees (comma-separated)", name: "degrees" },
            { label: "Languages (comma-separated)", name: "languages" },
            { label: "Specialty", name: "specialty" },
            { label: "Consultation Fee", name: "consultation_fee" },
            { label: "Cashback", name: "cashback" },
            { label: "Hospital", name: "hospital" },
            { label: "City", name: "city" },
          ].map(({ label, name }) => (
            <div key={name}>
              <Label htmlFor={name}>{label}</Label>
              <Input
                required
                id={name}
                name={name}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                value={(formData as any)[name]}
                onChange={handleChange}
              />
            </div>
          ))}

          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="online_consult"
                checked={formData.online_consult}
                onChange={handleChange}
              />
              Online Consult
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="hospital_visit"
                checked={formData.hospital_visit}
                onChange={handleChange}
              />
              Hospital Visit
            </label>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
