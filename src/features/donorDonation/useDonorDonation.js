import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { getDonationByDonorId } from "@/services/apiDonation";

export function useDonorDonation() {
  const { donorId } = useParams();
  const [searchParams] = useSearchParams();

  const campaignName = searchParams.get("campaign-name") || "";
  const pageNoParam = Number.parseInt(searchParams.get("page"));
  const pageNo = pageNoParam ? pageNoParam - 1 : 0;
  const fromDateStr = searchParams.get("from") || "";
  const toDateStr = searchParams.get("to") || "";

  const params = {
    donorId,
    campaignName,
    pageNo,
    fromDate: fromDateStr,
    toDate: toDateStr,
  };

  const { isLoading, data, isFetching } = useQuery({
    queryKey: ["donorDonation", params],
    queryFn: () => getDonationByDonorId(params),
    throwOnError: true,
    refetchOnMount: "always",
  });
  return { isLoading, data, isFetching };
}
