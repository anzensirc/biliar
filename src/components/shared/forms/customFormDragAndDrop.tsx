"use client";

import React, { useState, useRef, ChangeEvent, DragEvent } from "react";
import { cn } from "@/lib/utils";
import { Upload, File as FileIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext, FieldValues, Path, PathValue } from "react-hook-form";
import Image from "next/image";
import { myAlert } from "@/lib/myAlert";

interface CustomFormDragAndDropProps<T extends FieldValues = FieldValues> {
  name: Path<T>;
  label?: string;
  description?: string;
  maxSize?: number; // in MB
  maxFiles?: number;
  acceptedFileTypes?: string[];
  className?: string;
  required?: boolean;
}

export function CustomFormDragAndDrop<T extends FieldValues = FieldValues>({
  name,
  label,
  description,
  maxSize = 100,
  maxFiles = 1,
  acceptedFileTypes = ["image/jpeg", "image/png"],
  className,
  required = false,
}: CustomFormDragAndDropProps<T>) {
  const { control, watch, setValue } = useFormContext<T>();
  const fieldValue = watch(name) as PathValue<T, Path<T>> | string | undefined;

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
            <FileUploadControl
              value={field.value as unknown as File[]}
              onChange={(files) =>
                setValue(
                  field.name,
                  files as unknown as PathValue<T, Path<T>>,
                  {
                    shouldValidate: true,
                  }
                )
              }
              maxSize={maxSize}
              maxFiles={maxFiles}
              acceptedFileTypes={acceptedFileTypes}
              fieldValue={
                typeof fieldValue === "string" ? fieldValue : undefined
              }
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

interface FileUploadControlProps {
  value?: File[];
  onChange: (files: File[]) => void;
  maxSize?: number;
  maxFiles?: number;
  acceptedFileTypes?: string[];
  fieldValue?: string;
}

const FileUploadControl: React.FC<FileUploadControlProps> = ({
  value = [],
  onChange,
  maxSize = 100,
  maxFiles = 1,
  acceptedFileTypes = ["image/jpeg", "image/png"],
  fieldValue,
}) => {
  const [files, setFiles] = useState<File[]>(value);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptedFileTypesString = acceptedFileTypes.join(",");
  const fileTypeLabels: Record<string, string> = {
    "image/jpeg": "JPG",
    "image/png": "PNG",
  };

  const renderPreview = () => {
    // Helper cek ekstensi dari URL/file name
    const isPdf = (url: string) => url.toLowerCase().endsWith(".pdf");
    const isImage = (url: string) =>
      /\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(url);

    // Kalau fieldValue string (URL), cek tipe file dulu
    if (typeof fieldValue === "string" && fieldValue) {
      if (isPdf(fieldValue)) {
        return (
          <iframe
            src={fieldValue}
            title="Preview PDF"
            className="max-w-xs rounded-md mt-4 w-48 h-48"
          />
        );
      } else if (isImage(fieldValue)) {
        return (
          <Image
            src={fieldValue}
            alt="Preview"
            className="max-w-xs rounded-md mt-4 w-24 h-24 object-cover"
            width={300}
            height={300}
          />
        );
      } else {
        // fallback tampil link saja kalau bukan image/pdf
        return (
          <a
            href={fieldValue}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline mt-4 block max-w-xs truncate"
          >
            {fieldValue}
          </a>
        );
      }
    }
  };

  const getFileTypeLabel = () => {
    return acceptedFileTypes
      .map((type) => fileTypeLabels[type] || type)
      .join(" or ");
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files), files);
    }
  };

  // Tambahkan props value: string | File[] (atau buat parameter terpisah)
  const handleFiles = (selectedFiles: File[], prevValue: string | File[]) => {
    const validFiles: File[] = [];

    for (const file of selectedFiles) {
      const isValidType = acceptedFileTypes.includes(file.type);
      const isValidSize = file.size <= maxSize * 1024 * 1024;

      if (!isValidType) {
        myAlert.error(
          "Invalid file type",
          `File "${file.name}" is not a valid file type. Please upload ${getFileTypeLabel()} files only.`
        );
        continue;
      }

      if (!isValidSize) {
        myAlert.error(
          "File too large",
          `File "${file.name}" exceeds the maximum size of ${maxSize}MB.`
        );
        continue;
      }

      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    // Cek tipe prevValue, kalau string (bukan array) replace langsung
    let newFiles: File[];
    if (typeof prevValue === "string" || !Array.isArray(prevValue)) {
      newFiles = validFiles; // replace
    } else {
      // prevValue adalah array File[], append
      if (prevValue.length + validFiles.length > maxFiles) {
        myAlert.error(
          "Too many files",
          `You can only upload a maximum of ${maxFiles} file${maxFiles > 1 ? "s" : ""}.`
        );
        return;
      }
      newFiles = [...prevValue, ...validFiles];
    }

    setFiles(newFiles);
    onChange(newFiles);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    simulateUpload();
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files), files);
    }
  };

  const handleRemoveFile = (indexToRemove: number) => {
    const newFiles = files.filter((_, index) => index !== indexToRemove);
    setFiles(newFiles);
    onChange(newFiles);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={acceptedFileTypesString}
          onChange={handleFileChange}
          multiple={maxFiles > 1}
        />

        <div
          onClick={triggerFileInput}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={cn(
            "border-2 border-dashed rounded-lg p-6 transition-all text-center cursor-pointer bg-card",
            "flex flex-col items-center justify-center gap-3",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-primary/50"
          )}
        >
          <div className="bg-muted/50 p-3 rounded-full">
            <Upload />
          </div>
          <div className="flex flex-col gap-1 text-center">
            <p className="font-medium">Choose a file or drag & drop it here.</p>
            <p className="text-sm text-muted-foreground">
              {getFileTypeLabel()} (Max {maxSize} MB)
            </p>
          </div>
          <Button size="sm" variant="secondary" type="button">
            <Upload className="h-4 w-4 mr-2" />
            Browse File
          </Button>
        </div>

        {fieldValue && renderPreview()}
        {/* {fieldValue && files.length === 0 && (
          <div className="mt-4 space-y-4">
            Klik{" "}
            <Link
              target="_blank"
              href={fieldValue as string}
              className="text-blue-500 underline"
            >
              disini
            </Link>{" "}
            untuk melihat file yang diunggah
          </div>
        )} */}

        {files.length > 0 && (
          <div className="mt-4 space-y-4">
            {isUploading && (
              <Progress value={uploadProgress} className="h-2 w-full" />
            )}
            <div className="space-y-2">
              {Array.isArray(files) &&
                files?.map((file, index) => (
                  <div
                    key={`${file.name}-${index}`}
                    className="flex items-center justify-between rounded-md border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <FileIcon className="h-5 w-5 text-muted-foreground" />
                      <div className="flex flex-col">
                        <p className="font-medium truncate max-w-xs">
                          {file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleRemoveFile(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
      <FormMessage />
    </div>
  );
};
