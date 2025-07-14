"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

const Search = ({
  className = "w-full",
  name = "search",
}: {
  name?: string;
  className?: string;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get(name) || "");

  useEffect(() => {
    const currentParams = new URLSearchParams(searchParams.toString());
    if (query.trim()) {
      currentParams.set(name, query);
    } else {
      currentParams.delete(name);
    }
    router.push(`?${currentParams.toString()}`);
  }, [name, router, searchParams, query]);

  return (
    <div className={`relative flex items-center ${className}`}>
      <SearchIcon className="absolute left-2" />
      <Input
        placeholder="Cari"
        className="pl-10 h-10 bg-white border border-border"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
    </div>
  );
};

export default Search;
