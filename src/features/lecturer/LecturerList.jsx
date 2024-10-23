import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Image } from 'lucide-react';
import { HiOutlinePencil, HiOutlinePlus, HiOutlineXMark } from 'react-icons/hi2';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useLecturers } from '@/features/lecturer/useLecturers';
import { useDeleteLecturer } from '@/features/lecturer/useDeleteLecturer';
import { useAddLecturer } from '@/features/lecturer/useAddLecturer';
import { useUpdateLecturer } from '@/features/lecturer/useUpdateLecturer';
import PaginationGroup from '@/ui/PaginationGroup';
import SearchBar from '@/ui/SearchBar';
import Spinner from '@/ui/Spinner';
import FormRow from '@/ui/FormRow';
import Input from '@/ui/Input';
import { commafy, getTimeDiffStr } from '@/utils/helpers';

const LecturerList = () => {
    const { isLoading, data: lecturers, isFetching } = useLecturers();
    const { deleteLecturerById } = useDeleteLecturer();
    const { addLecturer } = useAddLecturer();
    const { updateLecturer } = useUpdateLecturer();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {},
    });
    const [fullname, setFullName] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);

    if (isLoading || isFetching)
        return (
            <div className="flex items-center justify-center">
                <Spinner size="lg" />
            </div>
        );

    const { content } = lecturers;

    const handleDelete = (id) => {
        console.log(id);
        deleteLecturerById(id);
    };

    const onSubmit = (name) => {
        addLecturer({ name });
        reset();
        setIsEditMode(false);
    };

    const onUpdate = (id) => {
        // updateLecturer({ name });
        console.log(id);
        console.log(fullname);
        // updateLecturer(data, id);
    };

    // Reset the form when dialog is opened to ensure no duplicate data
    const openEditDialog = (lecturer) => {
        setIsEditMode(true);
        reset({ fullname: lecturer.name }); // Reset form with lecturer name
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <SearchBar
                    queryParamKey="query"
                    pageParamKey="page"
                    inputPlaceholder="Tìm kiếm giảng viên..."
                    isLoading={isLoading || isFetching}
                    className="w-80 max-w-80"
                />
                <Dialog>
                    <DialogTrigger>
                        <div className="flex shrink-0 items-center justify-center gap-2 rounded-lg border-[1px] border-solid border-slate-400 bg-slate-100 px-3 py-2 text-slate-800 transition-colors hover:bg-slate-300">
                            <HiOutlinePlus className="h-5 w-5 shrink-0 text-slate-800" />
                            <span>Thêm giảng viên</span>
                        </div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Thêm giảng viên</DialogTitle>
                            <DialogDescription>
                                <div className="mx-auto my-0 flex max-w-sm items-center justify-center rounded-lg bg-white p-8">
                                    <div className="flex w-full flex-col gap-4">
                                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                                            <div className="flex flex-col gap-4">
                                                <FormRow label="Họ tên giảng viên" error={errors?.name?.message}>
                                                    <Input
                                                        type="text"
                                                        name="name"
                                                        id="name"
                                                        {...register('name', {
                                                            required: 'Vui lòng đầy đủ họ tên giảng viên',
                                                        })}
                                                    />
                                                </FormRow>
                                            </div>
                                            <div className="mt-2 flex items-center justify-center">
                                                <button className="flex min-w-28 items-center justify-center rounded-md border-[1px] border-solid border-slate-300 px-4 py-2 transition-colors hover:bg-slate-600 hover:text-slate-200">
                                                    Thêm
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-sm">
                <Table className="text-base">
                    <TableHeader>
                        <TableRow>
                            <TableHead>STT</TableHead>
                            <TableHead>Tên giảng viên</TableHead>
                            <TableHead className="max-w-28"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {content.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="table-cell">
                                    <span className="flex justify-center">Không tìm thấy chiến dịch</span>
                                </TableCell>
                            </TableRow>
                        ) : (
                            content.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    {/* <TableCell>
                                                {getTimeDiffStr(new Date(row.closeDate), new Date(), 'Đã đóng')}
                                            </TableCell> */}
                                    {/* <TableCell className="text-right">{commafy(row.currentAmount)} đ</TableCell> */}
                                    {/* <TableCell className="text-right">{commafy(row.targetAmount)} đ</TableCell> */}
                                    {/* <TableCell>{row.donationCount}</TableCell> */}
                                    <TableCell className="table-cell max-w-28">
                                        <div className="flex items-center justify-between gap-1">
                                            {/* <Link
                                                to={`/app/campaign/images/${row.id}`}
                                                className="shrink-0 rounded-md p-1 transition-colors hover:bg-slate-300"
                                            >
                                                <Image className="h-6 w-6" />
                                            </Link> */}
                                            <Dialog onOpenChange={() => openEditDialog(row)}>
                                                <DialogTrigger>
                                                    <div className="shrink-0 rounded-md p-1 transition-colors hover:bg-slate-300">
                                                        <HiOutlinePencil className="h-6 w-6" />
                                                    </div>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Chỉnh sửa giảng viên</DialogTitle>
                                                        <DialogDescription>
                                                            <div className="mx-auto my-0 flex max-w-sm items-center justify-center rounded-lg bg-white p-8">
                                                                <div className="flex w-full flex-col gap-4">
                                                                    <form
                                                                        onSubmit={handleSubmit((data) =>
                                                                            onUpdate(data, row.id),
                                                                        )}
                                                                        className="flex flex-col gap-4"
                                                                    >
                                                                        <div className="flex flex-col gap-4">
                                                                            <FormRow
                                                                                label="Họ tên giảng viên"
                                                                                error={errors?.fullname?.message}
                                                                            >
                                                                                <Input
                                                                                    type="text"
                                                                                    defaultValue={`${row.name}`}
                                                                                    onChange={(e) =>
                                                                                        setFullName(
                                                                                            e.target.defaultValue,
                                                                                        )
                                                                                    }
                                                                                    name="fullname"
                                                                                    id="fullname"
                                                                                    {...register('fullname', {
                                                                                        required:
                                                                                            'Vui lòng đầy đủ họ tên giảng viên',
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
                                            </Dialog>
                                            <AlertDialog>
                                                <AlertDialogTrigger>
                                                    <div className="shrink-0 rounded-md p-1 transition-colors hover:bg-slate-300">
                                                        <HiOutlineXMark className="h-6 w-6" />
                                                    </div>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>
                                                            Bạn có muốn xóa giảng viên này?
                                                        </AlertDialogTitle>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDelete(row.id)}>
                                                            OK
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
            <PaginationGroup pageInfo={lecturers} />
        </>
    );
};

export default LecturerList;
