import { useQuery } from "@tanstack/react-query";
import { getUser } from "../lib/api";

export const AUTH = "auth";

const useAuth = (opts = {}) => {
  const {
    data: user,
    isLoading,

    ...rest
  } = useQuery({
    queryKey: [AUTH],
    queryFn: getUser,
    staleTime: Infinity,
    retry: false,

    ...opts,
  });

  return {
    user,
    isLoading,

    ...rest,
  };
};

export default useAuth;
