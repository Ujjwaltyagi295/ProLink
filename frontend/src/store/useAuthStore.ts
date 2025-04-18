
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  isLoading:boolean
  setAuth: (auth: boolean) => void;
  clearAuth:()=>void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoading:false,
      isAuthenticated: false,
      setAuth: (auth) => set({ isAuthenticated: auth }),
      clearAuth:()=>set({isAuthenticated:false})
      
    }),
    {
      name: "auth-storage",
    }
  )
);