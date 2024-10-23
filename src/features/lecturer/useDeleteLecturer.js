import { useQueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { deleteLecturer } from '@/services/apiLecturer';

export function useDeleteLecturer() {
    const queryClient = useQueryClient(); // Sử dụng để cập nhật cache sau khi xóa

    // Sử dụng mutation để gọi API xóa giảng viên
    const {
        mutate: deleteLecturerById,
        isLoading,
        isError,
        isSuccess,
    } = useMutation({
        mutationFn: (id) => deleteLecturer(id), // Hàm gọi API xóa giảng viên
        onSuccess: () => {
            toast.success('Xóa giảng viên thành công!'); // Hiển thị thông báo thành công
            queryClient.invalidateQueries(['lecturers']); // Cập nhật lại cache, làm mới danh sách giảng viên
        },
        onError: (error) => {
            console.error(error); // Log lỗi ra console để dễ debug
            toast.error('Xóa giảng viên thất bại!'); // Hiển thị thông báo lỗi
        },
    });

    return { deleteLecturerById, isLoading, isError, isSuccess };
}
