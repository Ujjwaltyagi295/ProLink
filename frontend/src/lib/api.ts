import API from "@/config/apiClient";
import { ProjectDataType} from "@/store/useProjectStore";

export const login = async (data: object) => API.post("/auth/login", data);

export const register = async (data: object) => API.post("/auth/signup", data);
export const logout = async () => API.get("/auth/logout");
export const getUser = async () => API.get("/user");
export const createProject = async (data: object) => {
  const response = await API.post("/projects/create", data);
  return response.data;
};
export const getMyProject = async () => API.get("/projects");
export const getProjectsById= async(id:string)=>API.get(`/projects/${id}`)
export const publishProject = async (data: ProjectDataType) => {
 
    const response = await API.put(`/projects/${data.id}`, data);
    return response.data;
 
};