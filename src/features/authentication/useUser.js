import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../../services/apiAuth";

export function useUser() {
  const {
    isLoading,
    data: user,
    isFetching,
  } = useQuery({
    queryKey: ["user", "info"],
    queryFn: getUserInfo,
  });
  return {
    isLoading,
    user,
    isFetching,
  };
}
