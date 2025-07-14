"use client";

import React from "react";
import { useFormContext, FieldValues, Path } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { id, Locale } from "date-fns/locale";
import { cn, formatToMask } from "@/lib/utils";
import DatePicker from "react-datepicker";
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { CustomMaskedInput } from "@/components/ui/inputMasked";

interface CustomFormCalenderProps<T extends FieldValues = FieldValues> {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  description?: string;
  className?: string;
  buttonClassName?: string;
  required?: boolean;
  disabled?: boolean;
  locale?: Locale;
  dateFormat?: string;
  fromDate?: Date;
  toDate?: Date;
  disabledDates?: (date: Date) => boolean;
  onChange?: (date: Date | undefined) => void;
  fromYear?: number;
  toYear?: number;
  maxDate?: Date;
  minDate?: Date;
}

export function CustomFormCalender<T extends FieldValues = FieldValues>({
  name,
  label,
  placeholder = "Pilih Tanggal",
  description,
  className,
  buttonClassName,
  required = false,
  disabled = false,
  locale = id,
  dateFormat = "dd-MM-yyyy",
  fromDate,
  toDate = new Date(),
  disabledDates,
  onChange,
  fromYear = 1900,
  toYear,
  maxDate,
  minDate,
}: CustomFormCalenderProps<T>) {
  const form = useFormContext<T>();

  const isDateDisabled = (date: Date) => {
    if (fromDate && date < fromDate) return true;
    if (toDate && date > toDate) return true;
    if (disabledDates && disabledDates(date)) return true;

    const year = date.getFullYear();
    if (year < fromYear) return true;
    if (toYear && year > toYear) return true;

    return false;
  };

  return (
    <FormField
      control={form.control}
      name={name as Path<T>}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          {label && (
            <FormLabel>
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
          )}
          <Label
            className={cn(
              "border border-input rounded-full py-[5px] pl-3 flex justify-between items-center px-4 shadow-sm bg-card",
              buttonClassName
            )}
          >
            <DatePicker
              dateFormat={dateFormat}
              locale={locale}
              selected={field.value ? new Date(field.value) : undefined}
              onChange={(date) => {
                field.onChange(date?.toISOString().split("T")[0] ?? "");
                onChange?.(date ?? undefined);
              }}
              placeholderText={placeholder}
              disabled={disabled}
              filterDate={(date) => !isDateDisabled(date)}
              className="w-full focus:ring-0 focus:outline-none"
              yearDropdownItemNumber={90}
              scrollableYearDropdown
              showYearDropdown
              customInput={
                <CustomMaskedInput
                  mask={formatToMask(dateFormat)}
                  className="w-full bg-transparent focus:ring-0 focus:outline-none"
                />
              }
              maxDate={maxDate}
              minDate={minDate}
            />
            <CalendarIcon className="text-gray-500 ml-2" />
          </Label>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
