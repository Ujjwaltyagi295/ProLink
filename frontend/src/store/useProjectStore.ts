import { ExperienceLevel, ProjectStage, ProjectStatus, Role, TechStack } from "@/lib/schema";
import { create } from "zustand";
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
    banner: string;
    avatar: string;
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
  }
export const useFormStore= create<FormStore>((set)=>({
    projectData:{
        id:"",
        name:"",
        summary:"",
        description:"",
        banner:"",
        avatar:"",
        category:"",
        status:"draft",
        ecosystem:"",
        stage:"Idea",
        repoUrl:"",
        liveUrl:"",
        updatedAt:"",
        roles:[],
        techStack:[],
        

    },
    setFormData:(newData)=>set((state)=>({
        projectData:{...state.projectData,...newData}
    })),
    clearForm: () => set(() => ({
        projectData: {
            id:"",
          name: '',
          summary:"",
          description:"",
          banner: '',
          avatar: '',
          category: '',
          status: 'draft',
          stage: 'Idea',
          repoUrl: '',
          liveUrl: '',
          ecosystem:"",
          updatedAt: '',
          roles: [],
          techStack: [],
         
        },
      })),
}))
type ProjectSidebarState = {
  isOpen: boolean
  projectId: string
  setIsOpen: (data: boolean) => void
  setProjectId: (id: string) => void
  onClose: () => void
  // Add a combined action for better reliability
  openProject: (id: string) => void
}

export const useMyProjectStore = create<ProjectSidebarState>((set) => ({
  isOpen: false,
  projectId: "",
  setIsOpen: (data) => set({ isOpen: data }),
  setProjectId: (id) => set({ projectId: id }),
  onClose: () => set({ isOpen: false }),
  // Combined action to ensure both state changes happen together
  openProject: (id) => set({ projectId: id, isOpen: true })
}))