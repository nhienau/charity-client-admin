import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCampaign } from "@/services/apiCampaign";

export function useDeleteCampaign() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteCampaign,
    onSuccess: (data) => {
      queryClient.removeQueries({ queryKey: ["campaign", data.id] });
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      toast.success(`Xoá chiến dịch thành công`);
    },
    onError: (err) => {
      toast.error("Có lỗi xảy ra");
    },
  });

  return { mutate, isPending };
}
