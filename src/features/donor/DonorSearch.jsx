import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SearchBar from "@/ui/SearchBar";
import { DONOR_FILTER_OPTIONS } from "@/utils/constants";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { HiChevronDown } from "react-icons/hi2";
import { useDonors } from "./useDonors";

function DonorSearch() {
  const { isLoading, data, isFetching } = useDonors();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedOption, setSelectedOption] = useState(DONOR_FILTER_OPTIONS[0]);

  function onItemClick(option) {
    setSelectedOption(option);
    searchParams.set("filter", option.value);
    setSearchParams(searchParams);
  }

  return (
    <div className="mb-4 flex gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="flex items-center justify-between gap-2 rounded-lg border-[1px] border-solid border-slate-300 bg-slate-100 px-3 py-1 shadow-sm"
            disabled={isLoading || isFetching}
          >
            <span>{selectedOption.label}</span>
            <HiChevronDown className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 bg-white">
          {DONOR_FILTER_OPTIONS.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => onItemClick(option)}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <SearchBar
        queryParamKey="query"
        pageParamKey="page"
        inputPlaceholder="Tìm kiếm theo tên..."
        isLoading={isLoading || isFetching}
      />
    </div>
  );
}

export default DonorSearch;
