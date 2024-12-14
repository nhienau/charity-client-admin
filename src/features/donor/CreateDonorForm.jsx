import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HiOutlinePlus } from "react-icons/hi2";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import FormRow from "@/ui/FormRow";
import { useForm } from "react-hook-form";
import Input from "@/ui/Input";
import { useCreateDonor } from "./useCreateDonor";
import { useState } from "react";

function CreateDonorForm() {
  const { mutate, isPending } = useCreateDonor();
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {},
  });
  const { errors } = formState;
  const [open, setOpen] = useState(false);

  function onSubmit(data) {
    const requestData = {
      ...data,
      status: true,
    };
    console.log(requestData);
    mutate(requestData, {
      onSuccess: () => {
        reset();
        setOpen(false);
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex shrink-0 items-center justify-center gap-2 rounded-lg border-[1px] border-solid border-slate-400 bg-slate-100 px-3 py-2 text-slate-800 transition-colors hover:bg-slate-300">
          <HiOutlinePlus className="h-5 w-5 shrink-0 text-slate-800" />
          <span>Thêm sinh viên</span>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thêm sinh viên</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>Thêm sinh viên</DialogDescription>
          </VisuallyHidden>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 rounded-lg bg-white pt-4"
          >
            <FormRow
              label="Mã sinh viên"
              error={errors?.id?.message}
              small={true}
            >
              <Input
                type="text"
                name="id"
                id="id"
                {...register("id", {
                  required: "Mã sinh viên không được để trống",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Mã sinh viên không hợp lệ",
                  },
                })}
                disabled={isPending}
              />
            </FormRow>
            <FormRow
              label="Họ tên"
              error={errors?.defaultName?.message}
              small={true}
            >
              <Input
                type="text"
                name="defaultName"
                id="defaultName"
                {...register("defaultName", {
                  required: "Tên không được để trống",
                })}
                disabled={isPending}
              />
            </FormRow>
            <FormRow
              label="Mật khẩu"
              error={errors?.password?.message}
              small={true}
            >
              <Input
                type="password"
                name="password"
                id="password"
                {...register("password", {
                  required: "Mật khẩu không được để trống",
                })}
                disabled={isPending}
              />
            </FormRow>

            <div className="flex justify-end">
              <button
                className="rounded-md border-[1px] border-solid border-slate-300 px-4 py-1.5 disabled:bg-slate-200 disabled:text-slate-500"
                disabled={isPending}
              >
                Xác nhận
              </button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CreateDonorForm;
