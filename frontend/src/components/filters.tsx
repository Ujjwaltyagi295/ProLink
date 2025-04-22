import React, { useState, useEffect } from 'react';
import { useProjectsQuery } from '@/services/projectQuery';
import {
  ecosystemEnum,
  projectCategoryEnum,
  roleEnum,
  techStackEnum,
} from "@/lib/schema";
import { formatData } from '@/lib/utils';


const categoryOptions = projectCategoryEnum.map((value) => ({
  value,
  label: formatData(value),
}));

const ecosystemOptions = ecosystemEnum.map((value) => ({
  value,
  label: formatData(value),
}));

const roleOptions = roleEnum.map((value) => ({
  value,
  label: formatData(value),
}));

const techStackOptions = techStackEnum.map((value) => ({
  value,
  label: formatData(value),
}));
function useDebounce(value:string, delay:number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay change
  );

  return debouncedValue;
}

export function ProjectSearch() {
  const [search, setSearch] = useState("");

  // Debounce the search term
  const debouncedSearch = useDebounce(search, 500); // Wait 500ms after last keystroke

  const [filters, setFilters] = useState({
    search: "",
    category: "", // Changed from categories[]
    ecosystem: "", // Changed from ecosystems[]
    techStacks: [] as string[],
    roles: [] as string[],
    page: 1,
    limit: 10,
  });

  // Update the filters when the debounced search term changes
  useEffect(() => {
    setFilters((prev) => ({ ...prev, search: debouncedSearch, page: 1 }));
  }, [debouncedSearch]);

  const { data, isLoading, isError } = useProjectsQuery(filters);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value); // Update the search state immediately
  };

  // Updated handlers for single select fields
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, category: e.target.value, page: 1 }));
  };

  const handleEcosystemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, ecosystem: e.target.value, page: 1 }));
  };

  // Multiselect handlers remain the same
  const handleTechStackChange = (values: string[]) => {
    setFilters((prev) => ({ ...prev, techStacks: values, page: 1 }));
  };

  const handleRolesChange = (values: string[]) => {
    setFilters((prev) => ({ ...prev, roles: values, page: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Find Projects</h1>

      {/* Search input */}
      <div>
        <input
          type="text"
          placeholder="Search projects..."
          value={search} // bind to `search` state not `filters.search`
          onChange={handleSearchChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Filter selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Category filter - now single select */}
        <div>
          <label className="block mb-1">Category</label>
          <select
            value={filters.category}
            onChange={handleCategoryChange}
            className="w-full p-2 border rounded"
          >
            <option value="">All Categories</option>
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Ecosystem filter - now single select */}
        <div>
          <label className="block mb-1">Ecosystem</label>
          <select
            value={filters.ecosystem}
            onChange={handleEcosystemChange}
            className="w-full p-2 border rounded"
          >
            <option value="">All Ecosystems</option>
            {ecosystemOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Tech Stack filter - remains multi-select */}
        <div>
          <label className="block mb-1">Tech Stacks</label>
          <select
            multiple
            value={filters.techStacks}
            onChange={(e) => {
              const values = Array.from(
                e.target.selectedOptions,
                (option) => option.value
              );
              handleTechStackChange(values);
            }}
            className="w-full p-2 border rounded"
          >
            {techStackOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Roles filter - remains multi-select */}
        <div>
          <label className="block mb-1">Roles</label>
          <select
            multiple
            value={filters.roles}
            onChange={(e) => {
              const values = Array.from(
                e.target.selectedOptions,
                (option) => option.value
              );
              handleRolesChange(values);
            }}
            className="w-full p-2 border rounded"
          >
            {roleOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results section */}
      <div className="mt-6">
        {isLoading ? (
          <p>Loading projects...</p>
        ) : isError ? (
          <p className="text-red-500">Error loading projects</p>
        ) : (
          <>
            <p className="text-gray-600">
              Showing {data?.projects.length} of {data?.total} projects
            </p>

            {/* Project list */}
            <div className="mt-4 space-y-4">
              {data?.projects.map((project) => (
                <div key={project.id} className="border p-4 rounded shadow">
                  <h2 className="text-xl font-bold">{project.name}</h2>
                  <p className="text-gray-700">{project.summary}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.category && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                        {formatData(project.category)}
                      </span>
                    )}
                    {project.ecosystem && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                        {formatData(project.ecosystem)}
                      </span>
                    )}
                    {project.techStacks?.map((tech) => (
                      <span
                        key={tech}
                        className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm"
                      >
                        {formatData(tech)}
                      </span>
                    ))}
                    {project.roles?.map((role) => (
                      <span
                        key={role.id}
                        className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm"
                      >
                        {formatData(role.roles)}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {data && data.total > filters.limit && (
              <div className="mt-6 flex justify-center">
                <nav className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(filters.page - 1)}
                    disabled={filters.page === 1}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                  >
                    Previous
                  </button>

                  <span className="text-gray-700">
                    Page {filters.page} of{" "}
                    {Math.ceil(data.total / filters.limit)}
                  </span>

                  <button
                    onClick={() => handlePageChange(filters.page + 1)}
                    disabled={
                      filters.page >= Math.ceil(data.total / filters.limit)
                    }
                    className="px-3 py-1 border rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
