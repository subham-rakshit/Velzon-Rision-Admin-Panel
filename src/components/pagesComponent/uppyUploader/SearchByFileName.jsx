"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchByFileName = ({ searchQuery }) => {
  const handleSearch = (value) => {};

  return (
    <div className="relative min-w-[300px]">
      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
      <Input
        type="text"
        placeholder="Search by file name..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className="pl-8 pr-4 font-poppins-rg text-dark-weight-500 dark:text-light-weight-450 text-[13px] dark:border-[#fff]/10"
      />
    </div>
  );
};

export default SearchByFileName;
