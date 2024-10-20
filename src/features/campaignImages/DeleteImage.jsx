import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HiOutlineTrash } from "react-icons/hi2";
import { useCampaign } from "../campaign/useCampaign";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useDeleteCampaignImages } from "./useDeleteCampaignImages";

function DeleteImage({ images }) {
  const { mutate, isPending } = useDeleteCampaignImages();
  const { data: campaign } = useCampaign();
  const { name } = campaign;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex shrink-0 items-center justify-center gap-2 rounded-lg border-[1px] border-solid border-red-400 bg-red-300 px-3 py-2 text-slate-900 transition-colors hover:bg-red-500 hover:text-slate-100">
          <HiOutlineTrash className="h-5 w-5 shrink-0" />
          <span>Xoá</span>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Xoá hình ảnh</DialogTitle>
          <VisuallyHidden asChild>
            <DialogDescription>Xoá hình ảnh</DialogDescription>
          </VisuallyHidden>
          <p>
            Bạn có chắc chắn muốn xoá{" "}
            <span className="font-bold text-slate-800">
              {images.length} hình ảnh
            </span>{" "}
            của chiến dịch{" "}
            <span className="font-bold text-slate-800">{name}</span>? Thao tác
            này không thể hoàn tác.
          </p>
        </DialogHeader>
        <DialogFooter className="justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary" disabled={isPending}>
              Huỷ
            </Button>
          </DialogClose>
          <Button
            type="button"
            disabled={isPending}
            onClick={() => mutate(images)}
          >
            Xác nhận
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteImage;
