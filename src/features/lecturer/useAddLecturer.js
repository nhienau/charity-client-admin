import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { addLecturer as addLecturerApi } from '@/services/apiLecturer';

export function useAddLecturer() {
    const queryClient = useQueryClient();
    const {
        mutate: addLecturer,
        isLoading,
        isSuccess,
        isError,
        isFetching,
    } = useMutation({
        mutationFn: ({ name }) => addLecturerApi(name),
        onSuccess: () => {
            queryClient.invalidateQueries(['lecturers']);
            toast.success('Thêm giảng viên thành công!');
        },
        onError: (err) => {
            console.log(err);
            toast.error('Thêm giảng viên thất bại!');
        },
    });

    return {
        addLecturer,
        isLoading,
        isSuccess,
        isError,
        isFetching,
    };
}
