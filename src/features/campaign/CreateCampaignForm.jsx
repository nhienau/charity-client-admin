import { useController, useForm } from "react-hook-form";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";

function CreateCampaignForm() {
  const { register, handleSubmit, control, getValues, formState } = useForm({
    defaultValues: {},
  });
  const { errors } = formState;

  const { field: closeDateField } = useController({
    name: "closeDate",
    control,
    rules: {
      required: "Ngày đóng chiến dịch không được để trống",
    },
  });

  function onSubmit(data) {
    console.log({
      ...data,
      closeDateStr: data.closeDate.toISOString(),
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 rounded-lg bg-white p-4"
    >
      <FormRow label="Tên chiến dịch" error={errors?.name?.message}>
        <Input
          type="text"
          name="name"
          id="name"
          {...register("name", {
            required: "Tên chiến dịch không được để trống",
          })}
        />
      </FormRow>
      <FormRow label="Mô tả" error={errors?.description?.message}>
        <Input
          type="text"
          name="description"
          id="description"
          {...register("description", {
            required: "Mô tả không được để trống",
          })}
        />
      </FormRow>
      <FormRow label="Mục tiêu" error={errors?.targetAmount?.message}>
        <Input
          type="text"
          name="targetAmount"
          id="targetAmount"
          {...register("targetAmount", {
            required: "Mục tiêu không được để trống",
            pattern: {
              value: /^\d+$/,
              message: "Số tiền không hợp lệ",
            },
            min: {
              value: 1000,
              message: "Số tiền quyên góp ít nhất là 1,000 đ",
            },
          })}
        />
      </FormRow>
      <div className="flex flex-col gap-2 md:grid md:grid-cols-[10rem,1fr,1.2fr] md:items-center md:gap-4">
        <label htmlFor="closeDate" className="font-semibold">
          Ngày đóng
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "justify-start text-left font-normal",
                !closeDateField.value && "text-muted-foreground",
              )}
              id="closeDate"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {closeDateField.value ? (
                new Intl.DateTimeFormat("vi-VN", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                }).format(closeDateField.value)
              ) : (
                <span>Chọn ngày đóng</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={closeDateField.value}
              onSelect={closeDateField.onChange}
              onBlur={closeDateField.onBlur}
              ref={closeDateField.ref}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {errors?.closeDate?.message && (
          <span className="text-red-700">{errors?.closeDate?.message}</span>
        )}
      </div>

      <FormRow label="Mã bài viết" error={errors?.postId?.message}>
        <Input
          type="text"
          name="postId"
          id="postId"
          {...register("postId", {
            pattern: {
              value: /^\d+$/,
              message: "Mã bài viết không hợp lệ",
            },
          })}
        />
      </FormRow>
      <FormRow label="Giảng viên phụ trách" error={errors?.lecturerId?.message}>
        <Input
          type="text"
          name="lecturerId"
          id="lecturerId"
          {...register("lecturerId", {
            required: "Giảng viên không được để trống",
          })}
        />
      </FormRow>
      <div>
        <button className="rounded-md border-[1px] border-solid border-slate-300 px-3 py-1.5">
          Tạo
        </button>
      </div>
    </form>
  );
}

export default CreateCampaignForm;
