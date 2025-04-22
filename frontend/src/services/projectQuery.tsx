import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { projects, searchProjects, type ProjectFilters } from '@/lib/api';

export function useProjectsQuery(filters: ProjectFilters) {
  const queryKey = ['projects', {
    search: filters.search,
    category: filters.category,
    ecosystem: filters.ecosystem,
    techStacks: filters.techStacks?.sort(), 
    roles: filters.roles?.sort(),           
    page: filters.page,
    limit: filters.limit
  }];

  return useQuery({
    queryKey,
    queryFn: () => searchProjects({
      ...filters,
      techStacks: filters.techStacks ?? [],
      roles: filters.roles ?? []
    }),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5, 
    gcTime: 1000 * 60 * 10,   
    retry: 2,                
    refetchOnWindowFocus: false
  });
}


export const useGetAllProjectQuery=()=>{
  const getAllProjectQuery= useQuery({
      queryKey:["getproject"],
      queryFn:()=>projects.getAllProjects(),
      staleTime:1000 * 60 * 5,
      refetchOnWindowFocus: false
  })
  return {
    getAllProjects:getAllProjectQuery.data,
    isLoading:getAllProjectQuery.isLoading,
    isError:getAllProjectQuery.isError
  }
}