// lib/api/index.ts
import API from "@/config/apiClient";
import { ProjectDataType } from "@/store/useProjectStore";

// === AUTH ===
export const auth = {
  login: (data: object) => API.post("/auth/login", data),
  register: (data: object) => API.post("/auth/signup", data),
  logout: () => API.get("/auth/logout"),
  getUser: async () => {
    const response = await API.get("/user");
    return response.data;
  },
};

// === PROJECTS ===
export const myprojects = {
  create: async (data: object) => {
    const response = await API.post("/myprojects/create", data);
    return response.data;
  },

  getMine: async() =>{
    const response= await API.get("/myprojects")
    return response.data
  },

  getById: (id: string | undefined) => API.get(`/myprojects/${id}`),

  delete: (id: string | undefined) => API.delete(`/myprojects/${id}`),

  update: async (data: ProjectDataType) => {
    const response = await API.put(`/myprojects/${data.id}`, data);
    return response.data;
  },

  uploadImage: async (images: File): Promise<string> => {
    const formData = new FormData();
    formData.append("images", images);

  try {
    const response = await API.post(`/myprojects/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
    return response.data.url;

  } catch (error) {
    console.log(error)
  }
   
  },
};
