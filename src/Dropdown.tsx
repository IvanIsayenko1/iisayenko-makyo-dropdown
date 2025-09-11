import React from "react";

interface DropdownProps {
  label: string;
}

export const Dropdown: React.FC<DropdownProps> = ({ label }) => {
  return (
    <div className="border p-2 rounded color-white bg-blue-900">
      <span>{label}</span>
    </div>
  );
};
