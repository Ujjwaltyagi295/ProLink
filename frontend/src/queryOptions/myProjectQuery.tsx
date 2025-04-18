import { useToast } from "@/hooks/use-toast";
import {  projects } from "@/lib/api";
import { navigate } from "@/lib/navigation";
import { useFormStore } from "@/store/useProjectStore";
import {  queryOptions, useMutation,  useQueryClient } from "@tanstack/react-query";

export function useDeleteProject() {
    const {toast}=useToast()
    const queryClient=useQueryClient()
    return useMutation({
      mutationKey: ["deleteProject"],
      mutationFn: (projectId: string) => projects.delete(projectId),
      onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:["datacards"]as const});
        toast({title:"Project Deleted",type:"success"})
      }
    });

  }

  export function useGetMyProjects(){
    return queryOptions({
      queryKey:["myprojects"],
      queryFn:projects.getMine
    })
  }

  export function useAddProjects(){
   
     const { toast } = useToast();
      
        const {setFormData } = useFormStore();
    
    return useMutation({
      mutationFn:projects.create,
      mutationKey:["addProject"],
      
          onSuccess: (data) => {
              toast({ title: "Project created", type: "success" });
              navigate(`/dashboard/projects/edit/${data.id}`);
              setFormData({ id: data.id });
            },
        onError: (error) => {
      
          toast({
            title: "Something went wrong",
            description: `${error}`,
            type: "error",
          });
        },
    })

  }