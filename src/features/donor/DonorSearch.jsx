import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SearchBar from "@/ui/SearchBar";
import { DONOR_FILTER_OPTIONS } from "@/utils/constants";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { HiChevronDown } from "react-icons/hi2";
import { useDonors } from "./useDonors";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function DonorSearch() {
  const { isLoading, data, isFetching } = useDonors();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedOption, setSelectedOption] = useState(DONOR_FILTER_OPTIONS[0]);

  function onItemClick(value) {
    setSelectedOption(value);
    searchParams.set("filter", value);
    setSearchParams(searchParams);
  }

  useEffect(
    function () {
      const dropdownValue = searchParams.get("filter")?.toLowerCase() || "all";
      setSelectedOption(
        DONOR_FILTER_OPTIONS.map((o) => o.value).includes(dropdownValue)
          ? dropdownValue
          : "all",
      );
    },
    [searchParams],
  );

  return (
    <div className="flex gap-3">
      <Select value={selectedOption} onValueChange={onItemClick}>
        <SelectTrigger className="w-[8rem]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {DONOR_FILTER_OPTIONS.map((option) => (
              <SelectItem value={option.value} key={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
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
