import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { updateLecturer as updateLecturerApi } from '@/services/apiLecturer';

export function useUpdateLecturer() {
    const queryClient = useQueryClient();
    const {
        mutate: updateLecturer,
        isLoading,
        isSuccess,
        isError,
        isFetching,
    } = useMutation({
        mutationFn: ({ name }) => updateLecturerApi(name),
        onSuccess: () => {
            queryClient.invalidateQueries(['lecturers']);
            toast.success('Cập nhật giảng viên thành công!');
        },
        onError: (err) => {
            console.log(err);
            toast.error('Cập nhật giảng viên thất bại!');
        },
    });

    return {
        updateLecturer,
        isLoading,
        isSuccess,
        isError,
        isFetching,
    };
}
