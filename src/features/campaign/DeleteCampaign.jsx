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
import { useDeleteCampaign } from "./useDeleteCampaign";

function DeleteCampaign({ children, campaign }) {
  const { id, name } = campaign;
  const { mutate: deleteCampaign, isPending } = useDeleteCampaign();

  function handleDelete() {
    deleteCampaign(id);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Xoá chiến dịch</DialogTitle>
          <VisuallyHidden asChild>
            <DialogDescription>Xoá chiến dịch</DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        <p>
          Bạn có chắc chắn muốn xoá chiến dịch{" "}
          <span className="font-bold text-slate-800">{name}</span>? Thao tác này
          không thể hoàn tác.
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

export default DeleteCampaign;
