import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCampaign } from "@/services/apiCampaign";

export function useUpdateCampaign() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateCampaign,
    onSuccess: (data) => {
      queryClient.setQueryData(["campaign", data.id], data);
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      toast.success(`Cập nhật chiến dịch thành công`);
    },
    onError: (err) => {
      toast.error("Có lỗi xảy ra");
    },
  });

  return { mutate, isPending };
}
