"use client";

import { getCustomColor } from "@/lib/utils/customColor";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { MdSearch } from "react-icons/md";

const SearchCategoryForm = ({ searchValue }) => {
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );
  const customColor = getCustomColor({ layoutThemePrimaryColorType });
  const { active, bgColor, hoverBgColor, textColor, hexCode } = customColor;

  const router = useRouter();

  const handleCategorySearchFilter = (e) => {
    e.preventDefault();
    const value = e.target.search.value;
    router.push(`?search=${encodeURIComponent(value)}`, undefined, {
      shallow: true,
    });
  };

  return (
    <form
      onSubmit={handleCategorySearchFilter}
      className="flex items-center overflow-hidden rounded-sm border border-[#000]/20 dark:border-[#fff]/10"
    >
      <input
        type="text"
        name="search"
        placeholder="Type name & Enter"
        className="border-none bg-transparent px-2 py-1 font-poppins-rg text-[13px] text-dark-weight-550 dark:text-light-weight-550"
      />

      <button type="submit" className={`${active} p-2`}>
        <MdSearch size={16} color="#fff" />
      </button>
    </form>
  );
};

export default SearchCategoryForm;
