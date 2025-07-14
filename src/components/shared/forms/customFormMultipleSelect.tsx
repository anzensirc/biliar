"use client";

import React from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { MultiSelect } from "@/components/ui/multiSelect";

export interface SelectOption {
  value: string;
  label: string;
}

interface CustomFormMultiSelectProps<T extends FieldValues = FieldValues> {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  description?: string;
  options: SelectOption[];
  className?: string;
  required?: boolean;
  disabled?: boolean;
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "inverted"
    | null
    | undefined;
  animation?: number;
  maxCount?: number;
}

export function CustomFormMultiSelect<T extends FieldValues = FieldValues>({
  name,
  label,
  placeholder = "Pilih opsi",
  description,
  options,
  className,
  required = false,
  disabled = false,
  variant,
  animation,
  maxCount,
}: CustomFormMultiSelectProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel>
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <MultiSelect
              key={field.value}
              options={options}
              onValueChange={(values) => field.onChange(values)}
              defaultValue={field.value || []}
              placeholder={placeholder}
              variant={variant}
              animation={animation}
              maxCount={maxCount}
              disabled={disabled}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
