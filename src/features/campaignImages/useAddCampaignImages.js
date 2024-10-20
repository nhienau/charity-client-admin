import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addCampaignImages } from "@/services/apiCampaign";
import { useCampaign } from "../campaign/useCampaign";

export function useAddCampaignImages() {
  const queryClient = useQueryClient();
  const { data: campaign } = useCampaign();
  const { id } = campaign;

  const { mutate, isPending } = useMutation({
    mutationFn: ({ images, campaignId }) =>
      addCampaignImages(images, campaignId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["campaign", id] });
      toast.success(`Thêm ${data.length} ảnh thành công`);
    },
    onError: (err) => {
      toast.error("Có lỗi xảy ra");
    },
  });

  return { mutate, isPending };
}
