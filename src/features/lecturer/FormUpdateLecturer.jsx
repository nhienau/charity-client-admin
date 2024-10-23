import { useForm } from 'react-hook-form';
import FormRow from '@/ui/FormRow';
import Input from '@/ui/Input';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

const FormUpdateLecturer = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {},
    });

    const onUpdate = (data) => {
        console.log(data);
    };
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Chỉnh sửa giảng viên</DialogTitle>
                <DialogDescription>
                    <div className="mx-auto my-0 flex max-w-sm items-center justify-center rounded-lg bg-white p-8">
                        <div className="flex w-full flex-col gap-4">
                            <form onSubmit={handleSubmit(onUpdate)} className="flex flex-col gap-4">
                                <div className="flex flex-col gap-4">
                                    <FormRow label="Họ tên giảng viên" error={errors?.fullname?.message}>
                                        <Input
                                            type="text"
                                            defaultValue={`${row.name}`}
                                            onChange={(e) => setFullName(e.target.defaultValue)}
                                            name="fullname"
                                            id="fullname"
                                            {...register('fullname', {
                                                required: 'Vui lòng đầy đủ họ tên giảng viên',
                                            })}
                                        />
                                    </FormRow>
                                </div>
                                <div className="mt-2 flex items-center justify-center">
                                    <button
                                        onClick={() => onUpdate(row.id)}
                                        className="flex min-w-28 items-center justify-center rounded-md border-[1px] border-solid border-slate-300 px-4 py-2 transition-colors hover:bg-slate-600 hover:text-slate-200"
                                    >
                                        Cập nhật
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    );
};

export default FormUpdateLecturer;
