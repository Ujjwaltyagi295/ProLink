import { ExperienceLevel, ProjectStage, ProjectStatus, Role, TechStack } from "@/lib/schema";
import { create } from "zustand";
import { persist } from "zustand/middleware";
interface RoleFormData {
  id: string
  role: Role | ""
  description: string
  count: number
  isRemote: boolean
  experienceLevel: ExperienceLevel | ""
}
export interface ProjectDataType {
    id:string | undefined,
    name: string;
    summary:string,
    description:string;
    bannerFile?: File; 
    avatarFile?: File; 
    banner: string;
    avatar: string;
    teamSize:number;
    category: string;
    status: ProjectStatus;
    stage: ProjectStage;
    repoUrl: string;
    liveUrl: string;
    ecosystem:string;
    
    updatedAt: string;
    roles:RoleFormData[];
    techStack: TechStack[];
   
  }
  interface FormStore {
    projectData: ProjectDataType;
    setFormData: (newData: Partial<ProjectDataType>) => void;
    clearForm: () => void;
  }export const useFormStore = create<FormStore>()(
    persist(
      (set) => ({
        projectData: {
          id: "",
          name: "",
          summary: "",
          description: "",
          bannerFile: undefined,
          avatarFile: undefined,
          banner: "",
          avatar: "",
          category: "",
          status: "draft",
          teamSize: 2,
          ecosystem: "",
          stage: "Idea",
          repoUrl: "",
          liveUrl: "",
          updatedAt: "",
          roles: [],
          techStack: [],
        },
        setFormData: (newData) =>
          set((state) => ({
            projectData: { ...state.projectData, ...newData },
          })),
        clearForm: () =>
          set(() => ({
            projectData: {
              id: "",
              name: "",
              summary: "",
              description: "",
              bannerFile: undefined,
              avatarFile: undefined,
              banner: "",
              avatar: "",
              category: "",
              status: "draft",
              teamSize: 2,
              ecosystem: "",
              stage: "Idea",
              repoUrl: "",
              liveUrl: "",
              updatedAt: "",
              roles: [],
              techStack: [],
            },
          })),
      }),
      {
        name: "project-form-storage", // key for localStorage
      }
    )
  );
type ProjectSidebarState = {
  isOpen: boolean
  projectId: string
  isEditing:boolean
  setIsOpen: (data: boolean) => void
  setProjectId: (id: string) => void
  onClose: () => void
  setIsEditing:(data:boolean)=>void
  // Add a combined action for better reliability
  openProject: (id: string) => void
}

export const useMyProjectStore = create<ProjectSidebarState>((set) => ({
  isOpen: false,
  projectId: "",
  isEditing:false,
  setIsEditing:(data:boolean)=>set({isEditing:data}),
  setIsOpen: (data) => set({ isOpen: data }),
  setProjectId: (id) => set({ projectId: id }),
  onClose: () => set({ isOpen: false }),
  // Combined action to ensure both state changes happen together
  openProject: (id) => set({ projectId: id, isOpen: true })
}))

