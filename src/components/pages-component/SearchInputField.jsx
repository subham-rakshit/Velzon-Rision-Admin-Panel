"use client";

import { Input } from "@/components/ui/input";
import { getCustomColor } from "@/lib/utils/customColor";
import { useAppSelector } from "@/store/hooks";
import { debounce } from "lodash";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const SearchInputField = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );
  const customColor = getCustomColor({ layoutThemePrimaryColorType });
  const { active, bgColor, hoverBgColor, textColor, hexCode } = customColor;

  useEffect(() => {
    const currentQuery = searchParams.get("search");
    if (currentQuery) {
      setSearchQuery(currentQuery);
    }
  }, [searchParams]);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query) => {
      const params = new URLSearchParams(searchParams);
      if (query) {
        params.set("search", query);
      } else {
        params.delete("search");
      }
      router.push(`?${params.toString()}`);
    }, 250),
    [searchParams, router]
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
    debouncedSearch(query);
  };

  return (
    <div className="relative w-full sm:max-w-[300px]">
      <Search className=" h-4 w-4 text-gray-500 absolute left-2 top-1/2 -translate-y-1/2" />

      <Input
        type="text"
        name="searchInput"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className="pl-8 pr-4 font-poppins-rg text-dark-weight-500 dark:text-light-weight-450 text-[13px] dark:border-[#fff]/10"
      />
    </div>
  );
};

export default SearchInputField;
