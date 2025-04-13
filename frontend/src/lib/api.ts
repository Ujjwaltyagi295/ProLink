import API from "@/config/apiClient";

export const login = async (data: object) => API.post("/auth/login", data);

export const register = async (data: object) => API.post("/auth/signup", data);
export const logout = async () => API.get("/auth/logout");
export const getUser = async () => API.get("/user");
export const createProject = async (data: object) => {
  const response=await API.post("/projects/create", data);
  return response.data
};
export const getMyProject = async () => API.get("/projects");
