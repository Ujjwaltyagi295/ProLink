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
export const projects = {
  create: async (data: object) => {
    const response = await API.post("/projects/create", data);
    return response.data;
  },

  getMine: () => API.get("/projects"),

  getById: (id: string | undefined) => API.get(`/projects/${id}`),

  delete: (id: string | undefined) => API.delete(`/projects/${id}`),

  update: async (data: ProjectDataType) => {
    const response = await API.put(`/projects/${data.id}`, data);
    return response.data;
  },

  uploadImage: async (images: File): Promise<string> => {
    const formData = new FormData();
    formData.append("images", images);

    const response = await API.post(`/projects/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });

    return response.data.url;
  },
};
