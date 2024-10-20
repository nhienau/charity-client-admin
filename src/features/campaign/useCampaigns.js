import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getCampaigns } from "@/services/apiCampaign";

export function useCampaigns() {
  const [searchParams] = useSearchParams();

  const pageNoParam = Number.parseInt(searchParams.get("page"));
  const pageNo = pageNoParam ? pageNoParam - 1 : 0;

  const query = searchParams.get("query") ?? "";

  const { isLoading, data, isFetching } = useQuery({
    queryKey: ["campaigns", query, pageNo],
    queryFn: () => getCampaigns(query, pageNo),
    throwOnError: true,
  });
  return { isLoading, data, isFetching };
}
