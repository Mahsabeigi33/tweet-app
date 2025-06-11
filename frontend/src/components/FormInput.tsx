import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ReactNode } from "react";

interface FormInputProps {
  id: string;
  type?: string;
  label: string;
  placeholder?: string;
  icon?: ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent) => void;
  disabled?: boolean;
}

export default function FormInput({
  id,
  type = "text",
  label,
  placeholder,
  icon,
  value,
  onChange,
  onKeyPress,
  disabled = false,
}: FormInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <div className="relative">
        {icon && <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">{icon}</span>}
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyPress={onKeyPress}
          className={`pl-10 h-11`}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
