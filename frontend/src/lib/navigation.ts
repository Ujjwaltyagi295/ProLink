// utils/navigation.ts
import { NavigateFunction } from "react-router-dom";

export let navigate: NavigateFunction = () => {
  throw new Error("navigate function not set.");
};

export const setNavigate = (fn: NavigateFunction) => {
  navigate = fn;
};
