import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getLecturers } from "@/services/apiLecturer";

export function useLecturers(pageParam = "page", queryParam = "query") {
  const [searchParams] = useSearchParams();

  const pageNoParam = Number.parseInt(searchParams.get(pageParam));
  const pageNo = pageNoParam ? pageNoParam - 1 : 0;

  const query = searchParams.get(queryParam) ?? "";

  const { isLoading, data, isFetching } = useQuery({
    queryKey: ["lecturers", query, pageNo],
    queryFn: () => getLecturers(query, pageNo),
    throwOnError: true,
  });
  return { isLoading, data, isFetching };
}
