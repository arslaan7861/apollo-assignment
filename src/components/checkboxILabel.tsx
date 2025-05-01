"use client";
import React from "react";
import { Checkbox } from "./ui/checkbox";

type CheckboxILabelProps = {
  label: string;
  name?: string;
  checked: boolean;
  id: string;
  onCheckedChange: (c: boolean) => void;
};

function CheckboxILabel({
  label,
  name,
  checked,
  id,
  onCheckedChange,
}: CheckboxILabelProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        name={name}
        onCheckedChange={onCheckedChange}
        checked={checked}
        id={id}
      />
      <label
        htmlFor={id}
        className="text-sm  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 tracking-wider font-light"
      >
        {label}
      </label>
    </div>
  );
}

export default CheckboxILabel;
