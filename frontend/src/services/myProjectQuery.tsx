import { useToast } from "@/hooks/use-toast";
import { myprojects } from "@/lib/api";
import { navigate } from "@/lib/navigation";
import { ProjectDataType } from "@/store/useProjectStore";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
      navigate("/dashboard/projects")
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
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["myproject"]})
      toast({title:"Project deleted",type:"success"})
    }
  })
  return{
    projects:getMyProject.data ,
    isLoading: getMyProject.isLoading,
    error:getMyProject.error,
    createProject:createProjectMutation.mutate,
    updateProject:updateProjectMutation.mutate,
    isPending:updateProjectMutation.isPending,
    deleteProject:deleteProjectMutation.mutate
  }

   
};
