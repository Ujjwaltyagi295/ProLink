import { useToast } from "@/hooks/use-toast";
import { myprojects } from "@/lib/api";
import { navigate } from "@/lib/navigation";
import { ProjectDataType } from "@/store/useProjectStore";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface MyVariables {
  id: string;
  userId: string,
  status: string,
  roleId: string,
  projectId: string,
}
export const useMyprojectQuery = () => {
  const queryClient = useQueryClient();
  const {toast}= useToast()
  const getMyProject = useQuery({
    queryKey: ["myproject"],
    queryFn: myprojects.getMine,
    staleTime: 1000 * 60 * 5, 
 
  });
  const createProjectMutation = useMutation({
    mutationFn: myprojects.create,
    onSuccess: (newProject: ProjectDataType) => {
      queryClient.invalidateQueries({ queryKey: ["myproject"] });
      toast({title:"Project created successfully",type:"success"})
      navigate(`/dashboard/projects/edit/${newProject.id}`)

      queryClient.setQueryData<ProjectDataType[]>(["myproject"], (prevData) => {
        return prevData ? [...prevData, newProject] : [newProject];
      });
      
    
    },
  });
  const updateProjectMutation = useMutation({
    mutationFn: myprojects.update,
    onMutate: async (updatedProject: ProjectDataType) => {
     
      await queryClient.cancelQueries({ queryKey: ["myproject"] })
      
     
      const previousProjects = queryClient.getQueryData<ProjectDataType[]>(["myproject"])
   
      queryClient.setQueryData<ProjectDataType[]>(["myproject"], old => {
        if (!old) return [updatedProject]
        return old.map(project => 
          project.id === updatedProject.id ? updatedProject : project
        )
      })
      return { previousProjects }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myproject"] })
     
    },
    onError: (err, _variables, context) => {
      if (context?.previousProjects) {
        queryClient.setQueryData(["myproject"], context.previousProjects)
      }
      console.error("Update error:", err)
    }
  })
  const deleteProjectMutation = useMutation({
    mutationFn:myprojects.delete,
    onMutate: async (deletedProjectId: string) => {
      await queryClient.cancelQueries({ queryKey: ["myproject"] });
  
      const previousProjects = queryClient.getQueryData<ProjectDataType[]>(["myproject"]);
  
      queryClient.setQueryData<ProjectDataType[]>(["myproject"], (old = []) =>
        old ? old.filter((proj) => proj.id !== deletedProjectId) : []
      )
      return { previousProjects };
    },
    onError: (_err, _deletedProjectId, context) => {
    
      if (context?.previousProjects) {
        queryClient.setQueryData(["myproject"], context.previousProjects);
      }
      toast({ title: "Failed to delete project", type: "error" });
    },
  
    onSettled:()=>{
      queryClient.invalidateQueries({queryKey:["myproject"]})
      toast({title:"Project deleted",type:"success"})
    }
  })
  const manageApplicationMutation = useMutation({
    mutationFn:myprojects.manageApplication,
    onSettled: (_data,_error, variables:MyVariables) => {
      queryClient.invalidateQueries({ queryKey: ["getProjectByid", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["myproject"] });
      
    },
  })
  return{
    projects:getMyProject.data ,
    isLoading: getMyProject.isLoading,
    isFetching: getMyProject.isFetching,
    error:getMyProject.error,
    createProject: createProjectMutation.mutateAsync,

    updateProject:updateProjectMutation.mutate,
    isPending:updateProjectMutation.isPending,
    deleteProject:deleteProjectMutation.mutate,
    manageApplication: manageApplicationMutation.mutate
  }

   
};
export  const useGetApplicationByIdQuery=(id?:string )=> useQuery({
  queryKey:["getProjectByid",id],
  queryFn:()=> myprojects.getApplicationById(id),
  enabled: !!id,
})