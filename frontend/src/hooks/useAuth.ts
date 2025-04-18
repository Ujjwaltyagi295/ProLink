
import { useQuery } from "@tanstack/react-query";
import { auth } from "../lib/api";

export default function useAuth(opts={}){
  const {
    data: user,
    isLoading,
    ...rest
  } = useQuery({
    queryKey:["auth"],
    queryFn:auth.getUser,
    staleTime:Infinity,
    retry:false,
    ...opts
  })
  return{
    user,isLoading,...rest,
}
}