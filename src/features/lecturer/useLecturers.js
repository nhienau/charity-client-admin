import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getLecturers } from '@/services/apiLecturer';

export function useLecturers() {
    const [searchParams] = useSearchParams();

    const pageNoParam = Number.parseInt(searchParams.get('page'));
    const pageNo = pageNoParam ? pageNoParam - 1 : 0;

    const query = searchParams.get('query') ?? '';

    const { isLoading, data, isFetching } = useQuery({
        queryKey: ['lecturers', query, pageNo],
        queryFn: () => getLecturers(query, pageNo),
        throwOnError: true,
    });
    return { isLoading, data, isFetching };
}
