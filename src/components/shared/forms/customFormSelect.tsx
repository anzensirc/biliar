"use client";

import React from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface SelectOption {
  value: string | number;
  label: string;
}

interface CustomFormSelectProps<T extends FieldValues = FieldValues> {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  description?: string;
  options: SelectOption[];
  className?: string;
  required?: boolean;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
}

export function CustomFormSelect<T extends FieldValues = FieldValues>({
  name,
  label,
  placeholder = "Pilih opsi",
  description,
  options,
  className,
  required = false,
  disabled = false,
  onValueChange,
}: CustomFormSelectProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <FormField
      control={control}
      name={name as Path<T>}
      render={({ field }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel>
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
          )}
          <Select
            key={field.value}
            value={String(field.value ?? "")}
            onValueChange={(value) => {
              field.onChange(isNaN(Number(value)) ? value : Number(value));
              onValueChange?.(value);
            }}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger className="bg-card rounded-full">
                <SelectValue placeholder={placeholder}>
                  {
                    options.find(
                      (opt) => String(opt.value) === String(field.value)
                    )?.label
                  }
                </SelectValue>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.length > 0 ? (
                options.map((option) => (
                  <SelectItem key={option.value} value={String(option.value)}>
                    {option.label}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="empty" disabled>
                  Tidak ada opsi tersedia
                </SelectItem>
              )}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
