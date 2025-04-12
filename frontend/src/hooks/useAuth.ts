import { useQuery } from "@tanstack/react-query";
import { getUser } from "../lib/api";

export const AUTH = "auth";

const useAuth = (opts = {}) => {
  const { 
    data: user, 
    isLoading,
    isError,
    ...rest 
  } = useQuery({
    queryKey: [AUTH],
    queryFn: getUser,
    staleTime: Infinity,
    retry: false,
    // Remove onError since it's deprecated
    ...opts,
  });

  // Calculate authentication status from the query result
  const isAuthenticated = !!user && !isError;

  return {
    user,
    isLoading,
    isAuthenticated,
    ...rest,
  };
};

export default useAuth;