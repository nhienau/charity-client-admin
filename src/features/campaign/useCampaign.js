import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCampaign } from "@/services/apiCampaign";

export function useCampaign() {
  const { campaignId } = useParams();
  const { isLoading, data, isFetching } = useQuery({
    queryKey: ["campaign", Number(campaignId)],
    queryFn: () => getCampaign(campaignId),
    throwOnError: true,
  });
  return { isLoading, data, isFetching };
}
