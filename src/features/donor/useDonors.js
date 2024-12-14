import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getDonors } from "@/services/apiDonor";
import { DONOR_FILTER_OPTIONS } from "@/utils/constants";

export function useDonors() {
  const [searchParams] = useSearchParams();

  const filterParam = searchParams.get("filter") || "all";
  const filter = DONOR_FILTER_OPTIONS.map((o) => o.value).includes(filterParam)
    ? filterParam
    : "all";
  const pageNoParam = Number.parseInt(searchParams.get("page"));
  const pageNo = pageNoParam ? pageNoParam - 1 : 0;

  const query = searchParams.get("query") ?? "";

  const { isLoading, data, isFetching } = useQuery({
    queryKey: ["donors", query, filter, pageNo],
    queryFn: () => getDonors({ filter, query, pageNo }),
    throwOnError: true,
  });
  return { isLoading, data, isFetching };
}
