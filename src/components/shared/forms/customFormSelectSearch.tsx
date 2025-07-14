import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CommandItem } from "cmdk";
import { Check, ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import { useVirtualizer } from "@tanstack/react-virtual";

export interface SelectOption {
  value: string;
  label: string;
}

type CustomFormSelectSearchProps<T extends FieldValues = FieldValues> = {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  description?: string;
  options: SelectOption[];
  className?: string;
  required?: boolean;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
};

export default function CustomFormSelectSearch<
  T extends FieldValues = FieldValues,
>({
  name,
  label,
  placeholder = "Pilih opsi",
  description,
  options,
  className,
  required = false,
  disabled = false,
  onValueChange,
}: CustomFormSelectSearchProps<T>) {
  const { control, watch } = useFormContext<T>();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [readyToRender, setReadyToRender] = useState(false);

  const findLabel = () => {
    return options?.find((v) => v.value === watch(name))?.label || "";
  };

  const filteredItems =
    search.trim() === ""
      ? options
      : options.filter((item) =>
          item.label.toLowerCase().includes(search.toLowerCase())
        );

  const parentRef = React.useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: filteredItems.length, // ❗️HARUS filteredItems.length
    getScrollElement: () => parentRef.current!,
    estimateSize: () => 35, // lebih realistis, bukan 5
    overscan: 5,
  });

  useEffect(() => {
    if (open) {
      const timeout = setTimeout(() => {
        if (parentRef.current) {
          setReadyToRender(true);
        }
      }, 10); // delay sedikit biar ref keisi

      return () => clearTimeout(timeout);
    } else {
      setReadyToRender(false); // reset saat close
    }
  }, [open]);

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
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full border border-primary-700 text-black rounded-full justify-between py-[17px] text-sm"
                  )}
                  size={"sm"}
                >
                  {findLabel() || `Pilih ${placeholder}`}
                  <ChevronDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-full p-0"
                onOpenAutoFocus={() => {
                  requestAnimationFrame(() => {
                    rowVirtualizer.scrollToIndex(0); // optional
                  });
                }}
              >
                <Command className="w-96">
                  <CommandInput
                    placeholder={`Cari ${placeholder}...`}
                    className="h-9"
                    value={search}
                    onValueChange={setSearch}
                  />
                  <CommandList ref={parentRef} className="max-h-80">
                    <CommandEmpty>
                      Data {placeholder} tidak ditemukan.
                    </CommandEmpty>
                    <CommandGroup>
                      {readyToRender &&
                        rowVirtualizer.getVirtualItems().map((virtualRow) => {
                          const option = filteredItems[virtualRow.index]; // 🔥 ambil data aslinya
                          if (!option) return undefined;
                          return (
                            <CommandItem
                              key={virtualRow.key}
                              value={option?.label}
                              onSelect={(selectedLabel) => {
                                const selectedOption = options.find(
                                  (opt) => opt.label === selectedLabel
                                );
                                if (selectedOption) {
                                  field.onChange(selectedOption.value);
                                  setOpen(false);
                                }
                              }}
                              className="cursor-pointer px-2"
                            >
                              <span className="flex items-center justify-between">
                                {option.label}
                                {field.value === option.value && (
                                  <Check className="ml-2 h-4 w-4" />
                                )}
                              </span>
                            </CommandItem>
                          );
                        })}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
