import { useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProjectsQuery } from "@/services/projectQuery";
import { ProjectFilters } from "@/lib/api";
import { SearchCard } from "@/components/filtered-project/search-cards";
import { SkeletonCard } from "@/components/skeleton-cards";

import { useDebounce } from "use-debounce";

function SearchPage() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<ProjectFilters>({
    category: [],
    roles: [],
    techStacks: [],
    ecosystem: [],
    search: "",
  });
  const [debouncedSearch] = useDebounce(filters.search, 300);

  useEffect(() => {
    const newFilters = {
      category: searchParams.getAll("category"),
      roles: searchParams.getAll("roles"),
      techStacks: searchParams.getAll("techStacks"),
      ecosystem: searchParams.getAll("ecosystem"),
      search: searchParams.get("search") || "",
    };
    setFilters(newFilters);
  }, [location.search]);

  const handleSearchChange = (value: string) => {
    const newFilters = { ...filters, search: value };
    setFilters(newFilters);
    
    const params = new URLSearchParams();
    if (value) params.set("search", value);
    setSearchParams(params, { replace: true });
  };

  
  const { data, isLoading } = useProjectsQuery({
    ...filters,
    search: debouncedSearch,
  });

  const projects = data?.projects || [];
  const totalResults = data?.total || 0;

  return (
    <div className="">
 
      <div className="min-h-screen bg-gradient-to-b text-white px-4 py-12">
        <div className="max-w-4xl mx-auto text-center mt-24">
          <h1 className="text-4xl font-semibold text-black mb-8">Search</h1>
          <div className="relative max-w-xl mx-auto mb-10">
            <input
              type="search"
              value={filters.search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Type to search..."
              className="w-full bg-white border border-black text-black px-5 py-3 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <p className="text-sm text-gray-400 mb-6">{totalResults} results</p>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 max-w-5xl mx-auto">
          {isLoading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : projects.length > 0 ? (
            projects.map((project) => (
              <SearchCard key={project.id} project={project} />
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-400">
              {debouncedSearch ? "No results found" : "Start typing to search"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
