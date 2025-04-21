
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { searchProjects, ProjectFilters } from '@/lib/api';


export function useProjectsQuery(filters: ProjectFilters) {
  return useQuery({
    queryKey: ['projects', filters],
    queryFn: () => searchProjects(filters),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5, 
  });
}