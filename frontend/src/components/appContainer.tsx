import LoadingSpinner from "@/components/loadingSpiner";
import useAuth from "@/hooks/useAuth";


import { Navigate, Outlet } from "react-router-dom";



export const AppContainer = () => {
  const { user, isLoading } = useAuth();
  
  
  if (isLoading) return <LoadingSpinner />;

  return user ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      replace
      state={{ redirectUrl: window.location.pathname }}
    />
  );
};
