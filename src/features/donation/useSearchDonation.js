import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { searchDonation } from "@/services/apiDonation";

export function useSearchDonation() {
  const [searchParams] = useSearchParams();

  const phoneNumber = searchParams.get("phone-number") || "";
  const donorName = searchParams.get("donor-name") || "";
  const campaignName = searchParams.get("campaign-name") || "";
  const pageNoParam = Number.parseInt(searchParams.get("page"));
  const pageNo = pageNoParam ? pageNoParam - 1 : 0;
  const fromDateStr = searchParams.get("from") || "";
  const toDateStr = searchParams.get("to") || "";

  const params = {
    phoneNumber,
    donorName,
    campaignName,
    pageNo,
    fromDate: fromDateStr,
    toDate: toDateStr,
  };

  const { isLoading, data, isFetching } = useQuery({
    queryKey: ["searchDonation", params],
    queryFn: () => searchDonation(params),
    throwOnError: true,
    refetchOnMount: "always",
  });
  return { isLoading, data, isFetching };
}
