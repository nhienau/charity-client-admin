import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCampaignImages } from "@/services/apiCampaign";
import { useCampaign } from "../campaign/useCampaign";

export function useDeleteCampaignImages() {
  const queryClient = useQueryClient();
  const { data: campaign } = useCampaign();
  const { id } = campaign;

  const { mutate, isPending } = useMutation({
    mutationFn: (imageIds) => deleteCampaignImages(imageIds),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["campaign", id] });
      toast.success(`Xoá ${data.length} ảnh thành công`);
    },
    onError: (err) => {
      toast.error("Có lỗi xảy ra");
    },
  });

  return { mutate, isPending };
}
