import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/api";
import { navigate } from "@/lib/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

export  function useLoginQuery() {
  const location = useLocation();
  const redirectUrl = location.state?.redirectUrl || "/";
  const setAuth = useAuthStore((state) => state.setAuth);
  const {toast} =useToast()
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (data: object) => auth.login(data),
    onSuccess: () => {
      setAuth(true);
      toast({title:"Logged in successfully",type:"success"})
      navigate(redirectUrl, {
        replace: true,
      });
    },
    onError:(error)=>{
      toast({title:"Unable to login",description:`${error}`,type:"error"})
    }
  });
}
export  function useSignUpQuery() {
    const location = useLocation();
    const redirectUrl = location.state?.redirectUrl || "/";
    const setAuth = useAuthStore((state) => state.setAuth);
    const {toast} =useToast()
    return useMutation({
      mutationKey: ["signup"],
      mutationFn: (data: object) => auth.register(data),
      onSuccess: () => {
        toast({title:"Account created successfully",type:"success"})
        setAuth(true);
        navigate(redirectUrl, {
          replace: true,
        });
      },
      onError:(error)=>{
        toast({title:"Unable to Signup",description:`${error}`,type:"error"})
      }
    });
  }
  export  function useLogoutQuery() {
   
    const setAuth = useAuthStore((state) => state.setAuth);
    const queryClient=useQueryClient()
    const {toast} =useToast()

    return useMutation({
        mutationFn: auth.logout,
        mutationKey:["logout"],
        onSuccess: () => {
          setAuth(false)
          toast({title:"Logged out successfully",type:"success"})
          queryClient.clear();
          navigate("/login", { replace: true });
        },
        onError:(error)=>{
          toast({title:"Unable to logout",description:`${error}`,type:"error"})
        }
      })
  }
  
  
  