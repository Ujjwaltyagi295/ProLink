
import API from "@/config/apiClient";
import { ProjectDataType } from "@/store/useProjectStore";
import { FilterDataType } from "@/types/project";

export const auth = {
  login: (data: object) => API.post("/auth/login", data),
  register: (data: object) => API.post("/auth/signup", data),
  logout: () => API.get("/auth/logout"),
  getUser: async () => {
    const response = await API.get("/user");
    return response.data;
  },
};

export const myprojects = {
  create: async (data: object) => {
    const response = await API.post("/myprojects/create", data);
    return response.data;
  },

  getMine: async () => {
    const response = await API.get("/myprojects");
    return response.data;
  },

  getById:async (id: string | undefined) => {
  try {
    const response= await API.get(`/projects/${id}`)
   
    return response.data
  } catch (error) {
    console.log(error)
  }
  },

  delete: (id: string | undefined) => API.delete(`/myprojects/${id}`),

  update: async (data: ProjectDataType) => {
    const response = await API.put(`/myprojects/${data.id}`, data);
    return response.data;
  },

  uploadImage: async (image: File): Promise<string> => {
    const formData = new FormData();
    formData.append("images", image);

    const response = await API.post<{ url: string }>(
      "/myprojects/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return response.data.url[0];
  },
};

export const projects = {
  getAllProjects: async ()=> {
   const response= await API.get("/projects");
   return response.data
  },
  applyNow:async (data:object)=>{
   const res= await API.post("/projects/apply",data)
   return res.data
  }
};




export interface ProjectFilters {
  search?: string;
  category?: string[]; 
  ecosystem?: string[]; 
  techStacks?: string[];
  roles?: string[];
  page?: number;
  limit?: number;
  
}

export interface ProjectsResponse {
  projects: FilterDataType[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}


export async function searchProjects(filters: ProjectFilters): Promise<ProjectsResponse> {
  try {
    const params = new URLSearchParams();
    
    
    if (filters.search) params.append('search', filters.search);
    
    if (filters.category) {
      filters.category.forEach(c=>params.append("category",c))
    }
    
    if (filters.ecosystem) {
      filters.ecosystem.forEach(e=>params.append('ecosystem',e))
    }
    
   
    if (filters.techStacks?.length) {
      filters.techStacks.forEach(tech => params.append('techStacks', tech));
    }
    
    if (filters.roles?.length) {
      filters.roles.forEach(role => params.append('roles', role));
    }
    
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    
    const response = await API.get('/projects/filter', { params });
    
    return {
      projects: response.data.projects || [],
      total: response.data.total || 0,
      page: filters.page || 1,
      limit: filters.limit || 10,
      totalPages: Math.ceil((response.data.total || 0) / (filters.limit || 10))
    };
  } catch (error) {
    console.error('Error fetching projects:', error);
    return {
      projects: [],
      total: 0,
      page: filters.page || 1,
      limit: filters.limit || 10,
      totalPages: 0
    };
  }
}
