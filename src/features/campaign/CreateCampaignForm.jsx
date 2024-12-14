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
import LecturerDialog from "./LecturerDialog";
import { useCreateCampaign } from "./useCreateCampaign";
import { useUpdateCampaign } from "./useUpdateCampaign";

function CreateCampaignForm({ defaultValues = {}, mode = "create" }) {
  const { mutate: create, isPending: isCreating } = useCreateCampaign();
  const { mutate: update, isPending: isUpdating } = useUpdateCampaign();
  const { register, handleSubmit, control, formState, reset } = useForm({
    defaultValues,
  });
  const { errors } = formState;

  const { field: closeDateField } = useController({
    name: "closeDate",
    control,
    rules: {
      required: "Ngày đóng chiến dịch không được để trống",
      validate: (value) =>
        +value > new Date() || "Ngày đóng chiến dịch phải sau ngày hôm nay",
    },
  });

  const { field: lecturerField } = useController({
    name: "lecturer",
    control,
    rules: {
      required: "Giảng viên không được để trống",
    },
  });

  function onSubmit(data) {
    const requestData = {
      ...data,
      closeDate: null,
      closeDateStr: data.closeDate.toISOString(),
      targetAmount: Number(data.targetAmount),
      postId: Number(data.postId) || null,
      disbursementPostId: Number(data.disbursementPostId) || null,
      postDonationPostId: Number(data.postDonationPostId) || null,
      createdBy: 1, // fix later
    };
    if (mode === "create") {
      create(requestData, {
        onSuccess: () => {
          reset();
        },
      });
    } else {
      update(requestData);
    }
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
          disabled={isCreating || isUpdating}
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
          disabled={isCreating || isUpdating}
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
          disabled={isCreating || isUpdating}
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
                "justify-start text-left font-normal disabled:bg-slate-200 disabled:text-slate-500",
                !closeDateField.value && "text-muted-foreground",
              )}
              id="closeDate"
              disabled={isCreating || isUpdating}
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
          disabled={isCreating || isUpdating}
        />
      </FormRow>
      <FormRow
        label="Mã bài viết giải ngân"
        error={errors?.disbursementPostId?.message}
      >
        <Input
          type="text"
          name="disbursementPostId"
          id="disbursementPostId"
          {...register("disbursementPostId", {
            pattern: {
              value: /^\d+$/,
              message: "Mã bài viết không hợp lệ",
            },
          })}
          disabled={isCreating || isUpdating}
        />
      </FormRow>
      <FormRow
        label="Mã bài viết sau quyên góp"
        error={errors?.postDonationPostId?.message}
      >
        <Input
          type="text"
          name="postDonationPostId"
          id="postDonationPostId"
          {...register("postDonationPostId", {
            pattern: {
              value: /^\d+$/,
              message: "Mã bài viết không hợp lệ",
            },
          })}
          disabled={isCreating || isUpdating}
        />
      </FormRow>
      <div className="flex flex-col gap-2 md:grid md:grid-cols-[10rem,1fr,1.2fr] md:items-center md:gap-4">
        <label htmlFor="lecturerName" className="font-semibold">
          Giảng viên phụ trách
        </label>
        <div className="flex items-center gap-3">
          <Input
            type="text"
            name="lecturerName"
            id="lecturerName"
            className="grow"
            value={lecturerField.value ? lecturerField.value.name : ""}
            onChange={lecturerField.onChange}
            onBlur={lecturerField.onBlur}
            ref={lecturerField.ref}
            readOnly
            disabled={isCreating || isUpdating}
          />
          <LecturerDialog
            currentLecturer={lecturerField.value}
            onLecturerChosen={lecturerField.onChange}
            disabled={isCreating || isUpdating}
          />
        </div>
        {errors?.lecturer?.message && (
          <span className="text-red-700">{errors?.lecturer?.message}</span>
        )}
      </div>
      <div>
        <button
          className="rounded-md border-[1px] border-solid border-slate-300 px-4 py-1.5 disabled:bg-slate-200 disabled:text-slate-500"
          disabled={isCreating || isUpdating}
        >
          {mode === "create" ? "Tạo" : "Cập nhật"}
        </button>
      </div>
    </form>
  );
}

export default CreateCampaignForm;
