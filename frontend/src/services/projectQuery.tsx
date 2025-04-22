import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { searchProjects, type ProjectFilters } from '@/lib/api';

export function useProjectsQuery(filters: ProjectFilters) {
  // Convert filters to a stable reference for query key
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
      // Ensure arrays aren't null/undefined
      techStacks: filters.techStacks ?? [],
      roles: filters.roles ?? []
    }),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10,   // 10 minutes cache
    retry: 2,                 // Retry twice on failure
    refetchOnWindowFocus: false
  });
}
