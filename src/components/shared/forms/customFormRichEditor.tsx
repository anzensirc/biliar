"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import RichTextEditor from "@/components/ui/richTextEditor";

interface CustomFormRichEditorProps<T extends FieldValues = FieldValues> {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  description?: string;
  className?: string;
  editorClassName?: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

export default function CustomFormRichEditor<
  T extends FieldValues = FieldValues,
>({
  name,
  label,
  placeholder,
  className,
  editorClassName,
  onChange,
}: CustomFormRichEditorProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("w-full", className)}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <RichTextEditor
              value={field.value}
              onChange={(val) => {
                field.onChange(val);
                onChange?.(val);
              }}
              placeholder={placeholder}
              editorClassName={editorClassName}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
