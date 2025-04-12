import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  setAuth: (auth: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      setAuth: (auth) => set({ isAuthenticated: auth }),
    }),
    {
      name: "auth-storage", // unique name for localStorage key
    }
  )
);