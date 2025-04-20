import { projects } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"

export const useProjectQuery= ()=>{
    const getAllProjectQuery= useQuery({
        queryKey:["projects"],
        queryFn:projects.getAllProjects,
    
    })
    
    return {
        getAllProjects:getAllProjectQuery.data,
        isLoading:getAllProjectQuery.isLoading,
        isError:getAllProjectQuery.isError
    }
}