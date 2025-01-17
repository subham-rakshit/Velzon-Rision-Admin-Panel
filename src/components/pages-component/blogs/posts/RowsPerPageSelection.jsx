"use client";

import { globalStyleObj } from "@/app/assets/styles";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

const RowsPerPageSelection = ({ paginationDetails }) => {
  const router = useRouter();

  const handleSelectRowsPerPage = (value) => {
    router.push(`?page=1&pageSize=${encodeURIComponent(value)}`, undefined, {
      shallow: true,
    });
  };

  return (
    <Select
      value={parseInt(paginationDetails.currentLimit) || 9}
      onValueChange={(value) => handleSelectRowsPerPage(value)}
    >
      <SelectTrigger className="w-fit border dark:border-[#fff]/10">
        <SelectValue placeholder="--" className="font-poppins-rg text-[13px]" />
      </SelectTrigger>
      <SelectContent
        className={`w-fit font-poppins-rg text-[13px] ${globalStyleObj.backgroundLight900Dark300} text-dark-weight-500 dark:text-light-weight-400`}
      >
        <SelectGroup>
          <SelectLabel className="text-dark-weight-600 dark:text-light-weight-800">
            Rows
          </SelectLabel>
          <SelectItem value={1}>1</SelectItem>
          <SelectItem value={9}>9</SelectItem>
          <SelectItem value={12}>12</SelectItem>
          <SelectItem value={15}>15</SelectItem>
          <SelectItem value={18}>18</SelectItem>
          <SelectItem value={21}>21</SelectItem>
          <SelectItem value={24}>24</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default RowsPerPageSelection;
