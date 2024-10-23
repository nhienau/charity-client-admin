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
import LecturerChooser from "../lecturer/LecturerChooser";
import { useState } from "react";

function LecturerDialog({ currentLecturer, onLecturerChosen, disabled }) {
  const [lecturer, setLecturer] = useState(currentLecturer ?? {});

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="rounded-md border-[1px] border-solid border-slate-300 px-4 py-1.5 disabled:bg-slate-200 disabled:text-slate-500"
          disabled={disabled}
        >
          Chọn
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Chọn giảng viên</DialogTitle>
          <DialogDescription>
            Chọn giảng viên phụ trách chiến dịch này
          </DialogDescription>
        </DialogHeader>
        {currentLecturer && (
          <div>
            <p>
              Đang chọn: Giảng viên{" "}
              <span className="font-bold">{currentLecturer.name}</span>
            </p>
          </div>
        )}
        <LecturerChooser
          pageParam="lecturer-page"
          queryParam="lecturer-query"
          currentLecturer={currentLecturer}
          setLecturer={setLecturer}
        />
        <DialogFooter>
          <DialogClose asChild>
            <button
              type="button"
              className="rounded-md border-[1px] border-solid border-slate-300 px-4 py-1.5 disabled:bg-slate-200 disabled:text-slate-500"
              onClick={() => onLecturerChosen(lecturer)}
              disabled={lecturer === null || !Object.keys(lecturer).length}
            >
              Xác nhận
            </button>
          </DialogClose>
          <DialogClose asChild>
            <button
              type="button"
              className="rounded-md border-[1px] border-solid border-slate-300 px-4 py-1.5"
            >
              Đóng
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default LecturerDialog;
