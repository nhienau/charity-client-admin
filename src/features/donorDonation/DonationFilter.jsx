import { useController, useForm } from "react-hook-form";
import { HiOutlineArrowPath, HiOutlineMagnifyingGlass } from "react-icons/hi2";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";
import DateField from "@/ui/DateField";
import { useSearchParams } from "react-router-dom";

function DonationFilter() {
  const { register, handleSubmit, control, formState, reset } = useForm({
    defaultValues: {},
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const { errors } = formState;

  const { field: fromDateField } = useController({
    name: "fromDate",
    control,
    rules: {
      validate: {
        bothDatesRequired: (value, allValues) => {
          if (!value && allValues.toDate) {
            return "Ngày bắt đầu không được bỏ trống";
          }
          return true;
        },
        notAfterToday: (value) => {
          const fromDate = new Date(value);
          const today = new Date();

          if (fromDate > today) {
            return "Ngày bắt đầu không được sau ngày hôm nay";
          }
          return true;
        },
      },
    },
  });

  const { field: toDateField } = useController({
    name: "toDate",
    control,
    rules: {
      validate: {
        bothDatesRequired: (value, allValues) => {
          if (allValues.fromDate && !value) {
            return "Ngày kết thúc không được bỏ trống";
          }
          return true;
        },
        notAfterToday: (value) => {
          const toDate = new Date(value);
          const today = new Date();

          if (toDate > today) {
            return "Ngày kết thúc phải trước ngày hôm nay";
          }
          return true;
        },
        notBeforeFromDate: (value, allValues) => {
          if (value < allValues.fromDate) {
            return "Ngày kết thúc phải sau ngày bắt đầu";
          }
          return true;
        },
      },
    },
  });

  function onSubmit(data) {
    const { campaignName, fromDate, toDate } = data;

    if (toDate) {
      toDate.setHours(23);
      toDate.setMinutes(59);
      toDate.setSeconds(59);
    }

    const fromDateStr = fromDate ? fromDate.toISOString() : "";
    const toDateStr = toDate ? toDate.toISOString() : "";
    searchParams.set("campaign-name", campaignName.trim());
    searchParams.set("from", fromDateStr);
    searchParams.set("to", toDateStr);
    setSearchParams(searchParams);
  }

  function resetParams() {
    reset({ campaignName: "" });
    searchParams.set("campaign-name", "");
    searchParams.set("from", "");
    searchParams.set("to", "");
    setSearchParams(searchParams);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-6 flex flex-col gap-4 md:grid md:grid-cols-3"
    >
      <FormRow label="Tên chiến dịch" small={true}>
        <Input
          name="campaignName"
          id="campaignName"
          {...register("campaignName")}
        />
      </FormRow>
      <div className="flex flex-col gap-2">
        <label htmlFor="fromDate" className="font-semibold">
          Từ ngày
        </label>
        <DateField field={fromDateField} placeholder="Chọn ngày" />
        {errors?.fromDate?.message && (
          <span className="text-red-700">{errors?.fromDate?.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="toDate" className="font-semibold">
          Đến ngày
        </label>
        <DateField field={toDateField} placeholder="Chọn ngày" />
        {errors?.toDate?.message && (
          <span className="text-red-700">{errors?.toDate?.message}</span>
        )}
      </div>
      <div className="flex justify-end gap-2 md:col-span-3">
        <button
          type="button"
          className="flex items-center gap-x-2 rounded-md border-[1px] border-solid border-slate-300 bg-white px-4 py-1.5"
          onClick={resetParams}
        >
          <HiOutlineArrowPath className="h-5 w-5 flex-shrink-0" />
          <span>Đặt lại</span>
        </button>
        <button
          type="submit"
          className="flex items-center gap-x-2 rounded-md border-[1px] border-solid border-slate-300 bg-white px-4 py-1.5"
        >
          <HiOutlineMagnifyingGlass className="h-5 w-5 flex-shrink-0" />
          <span>Tìm kiếm</span>
        </button>
      </div>
    </form>
  );
}

export default DonationFilter;
