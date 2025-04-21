import catchErrors from "../../utils/catchErrors";
import { ProjectFilters, searchProjects } from "./filterProject.service";

export const filterProjects = catchErrors(async (req, res) => {
  try {
    const { 
      search, 
      categories, 
      ecosystems, 
      techStacks, 
      roles, 
      page, 
      limit 
    } = req.query;

    const filters: ProjectFilters = {
      search: search as string,
      categories: categories ? String(categories) : undefined,
      ecosystems: ecosystems ? String(ecosystems) : undefined,
 
      techStacks: techStacks ? (Array.isArray(techStacks) ? techStacks : [techStacks]).map(String) : undefined,
      roles: roles ? (Array.isArray(roles) ? roles : [roles]).map(String) : undefined,
      page: page ? parseInt(page as string, 10) : 1,
      limit: limit ? parseInt(limit as string, 10) : 10,
    };

    const results = await searchProjects(filters);
    return res.json(results);
  } catch (error) {
    console.error('Error searching projects:', error);
    return res.status(500).json({ message: 'Internal server error', error: String(error) });
  }
});