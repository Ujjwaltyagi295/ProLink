import React, { useState } from 'react';
import { useProjectsQuery } from '@/services/projectQuery';
import { ecosystemEnum, projectCategoryEnum, roleEnum, techStackEnum } from '@/lib/schema';

const formatData = (text: string) =>
    text
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  
  const categoryOptions = projectCategoryEnum.map(value => ({
    value,      
    label: formatData(value)  
  }));
  
  const ecosystemOptions = ecosystemEnum.map(value => ({
    value, 
    label: formatData(value)
  }));
  
  const roleOptions = roleEnum.map(value => ({
    value, 
    label: formatData(value)
  }));
  
  const techStackOptions = techStackEnum.map(value => ({
    value, 
    label: formatData(value)
  }));
export function ProjectSearch() {
  // State for all filters
  const [filters, setFilters] = useState({
    search: '',
    categories: [] as string[],
    ecosystems: [] as string[],
    techStacks: [] as string[],
    roles: [] as string[],
    page: 1,
    limit: 10
  });

  // Use our custom query hook
  const { data, isLoading, isError } = useProjectsQuery(filters);

  // Handler for search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value, page: 1 }));
  };

  // Handler for multiselect filters
  const handleFilterChange = (field: string, values: string[]) => {
    setFilters(prev => ({ ...prev, [field]: values, page: 1 }));
  };

  // Handler for pagination
  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Find Projects</h1>
      
      {/* Search input */}
      <div>
        <input
          type="text"
          placeholder="Search projects..."
          value={filters.search}
          onChange={handleSearchChange}
          className="w-full p-2 border rounded"
        />
      </div>
      
      {/* Filter selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Category filter */}
        <div>
          <label className="block mb-1">Categories</label>
          <select
            multiple
            value={filters.categories}
            onChange={(e) => {
              const values = Array.from(
                e.target.selectedOptions,
                option => option.value
              );
              handleFilterChange('categories', values);
            }}
            className="w-full p-2 border rounded"
          >
            {categoryOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        {/* Ecosystem filter */}
        <div>
          <label className="block mb-1">Ecosystems</label>
          <select
            multiple
            value={filters.ecosystems}
            onChange={(e) => {
              const values = Array.from(
                e.target.selectedOptions,
                option => option.value
              );
              handleFilterChange('ecosystems', values);
            }}
            className="w-full p-2 border rounded"
          >
            {ecosystemOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        {/* Tech Stack filter */}
        <div>
          <label className="block mb-1">Tech Stacks</label>
          <select
            multiple
            value={filters.techStacks}
            onChange={(e) => {
              const values = Array.from(
                e.target.selectedOptions,
                option => option.value
              );
              handleFilterChange('techStacks', values);
            }}
            className="w-full p-2 border rounded"
          >
            {techStackOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        {/* Roles filter */}
        <div>
          <label className="block mb-1">Roles</label>
          <select
            multiple
            value={filters.roles}
            onChange={(e) => {
              const values = Array.from(
                e.target.selectedOptions,
                option => option.value
              );
              handleFilterChange('roles', values);
            }}
            className="w-full p-2 border rounded"
          >
            {roleOptions.map(option => (
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
              {data?.projects.map(project => (
                <div key={project.id} className="border p-4 rounded shadow">
                  <h2 className="text-xl font-bold">{project.name}</h2>
                  <p className="text-gray-700">{project.summary}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.category && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                        {project.category.replace(/_/g, ' ')}
                      </span>
                    )}
                    {project.ecosystem && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                        {project.ecosystem.replace(/_/g, ' ')}
                      </span>
                    )}
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
                    Page {filters.page} of {Math.ceil(data.total / filters.limit)}
                  </span>
                  
                  <button
                    onClick={() => handlePageChange(filters.page + 1)}
                    disabled={filters.page >= Math.ceil(data.total / filters.limit)}
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