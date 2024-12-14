import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createDonor } from "@/services/apiDonor";

export function useCreateDonor() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (donor) => createDonor(donor),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["donors"] });
      toast.success(`Thêm sinh viên thành công`);
    },
    onError: (err) => {
      toast.error("Mã sinh viên đã tồn tại");
    },
  });

  return { mutate, isPending };
}
