import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useDeleteDonor } from "./useDeleteDonor";

function DeleteDonor({ children, donor }) {
  const { id, defaultName } = donor;
  const { mutate: deleteDonor, isPending } = useDeleteDonor();

  function handleDelete() {
    deleteDonor(id);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Xoá sinh viên</DialogTitle>
          <VisuallyHidden asChild>
            <DialogDescription>Xoá sinh viên</DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        <p>
          Bạn có chắc chắn muốn xoá sinh viên{" "}
          <span className="font-bold text-slate-800">{defaultName}</span>? Thao
          tác này không thể hoàn tác.
        </p>
        <DialogFooter>
          <button
            type="button"
            className="rounded-md border-[1px] border-solid border-slate-300 px-4 py-1.5 disabled:bg-slate-200 disabled:text-slate-500"
            onClick={handleDelete}
            disabled={isPending}
          >
            Xác nhận
          </button>
          <DialogClose asChild>
            <button
              type="button"
              className="rounded-md border-[1px] border-solid border-slate-300 px-4 py-1.5"
              disabled={isPending}
            >
              Đóng
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteDonor;
