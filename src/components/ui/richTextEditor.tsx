"use client";

import React, { useMemo, useRef } from "react";
import ReactQuill, { Quill } from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "quill-table-better/dist/quill-table-better.css";
import QuillTableBetter from "quill-table-better";
import { cn } from "@/lib/utils";

// Register plugin
Quill.register({ "modules/table-better": QuillTableBetter }, true);

export interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  editorClassName?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value = "",
  onChange,
  placeholder = "Tulis sesuatu...",
  className,
  editorClassName,
}) => {
  const quillRef = useRef(null);
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ align: [] }],
          [{ color: [] }, { background: [] }],
          ["link", "image"],
          ["table-better"],
          ["clean"],
        ],
      },
      table: false,
      "table-better": {
        language: "en_US",
        menus: [
          "column",
          "row",
          "merge",
          "table",
          "cell",
          "wrap",
          "copy",
          "delete",
        ],
        toolbarTable: true,
      },
      keyboard: {
        bindings: QuillTableBetter.keyboardBindings,
      },
    }),
    []
  );

  return (
    <div className={cn("rounded-[14px] bg-card", className)}>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder={placeholder}
        className={editorClassName}
      />
    </div>
  );
};

export default RichTextEditor;
