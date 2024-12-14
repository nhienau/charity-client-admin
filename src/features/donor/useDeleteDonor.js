import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteDonor } from "@/services/apiDonor";

export function useDeleteDonor() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteDonor,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["donorDonation"] });
      queryClient.invalidateQueries({ queryKey: ["donors"] });
      toast.success(`Xoá người dùng thành công`);
    },
    onError: (err) => {
      toast.error("Có lỗi xảy ra");
    },
  });

  return { mutate, isPending };
}
