import { useForm } from 'react-hook-form';
import { useState } from 'react';
import FormRow from '@/ui/FormRow';
import Input from '@/ui/Input';

import { useUpdateLecturer } from '@/features/lecturer/useUpdateLecturer';

const FormUpdateLecturer = ({ fullName, id, children }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {},
    });
    const { updateLecturer } = useUpdateLecturer();

    const onUpdate = (name, id) => {
        console.log(name);
        console.log({ name, id });
        updateLecturer({ name, id });
    };
    return (
        <div className="mx-auto my-0 flex max-w-sm items-center justify-center rounded-lg bg-white p-8">
            <div className="flex w-full flex-col gap-4">
                <form onSubmit={handleSubmit((name) => onUpdate(name, id))} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4">
                        <FormRow label="Họ tên giảng viên" error={errors?.fullname?.message}>
                            <Input
                                type="text"
                                defaultValue={fullName}
                                name="fullname"
                                id="fullname"
                                {...register('fullname', {
                                    required: 'Vui lòng đầy đủ họ tên giảng viên',
                                })}
                            />
                        </FormRow>
                    </div>
                    <div className="mt-2 flex items-center justify-center">
                        <button className="flex min-w-28 items-center justify-center rounded-md border-[1px] border-solid border-slate-300 px-4 py-2 transition-colors hover:bg-slate-600 hover:text-slate-200">
                            Cập nhật
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormUpdateLecturer;
