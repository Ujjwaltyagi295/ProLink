import { ecosystemEnum, projectCategoryEnum, roleEnum, techStackEnum } from "../../models/projectEnums";
import catchErrors from "../../utils/catchErrors";
import { searchProjects } from "./filterProject.service";

export const filterProjects = catchErrors(async (req, res) => {
  try {
    const { 
      search, 
      category,  // Changed from categories
      ecosystem, // Changed from ecosystems
      techStacks, 
      roles, 
      page, 
      limit 
    } = req.query;

    const filters = {
      search: search as string | undefined,
      category: category ? String(category) as typeof projectCategoryEnum.enumValues[number] : undefined,
      ecosystem: ecosystem ? String(ecosystem) as typeof ecosystemEnum.enumValues[number] : undefined,
      techStacks: techStacks 
        ? (Array.isArray(techStacks) 
            ? techStacks 
            : [techStacks]
          ).map(String) as typeof techStackEnum.enumValues[number][] 
        : undefined,
      roles: roles 
        ? (Array.isArray(roles) 
            ? roles 
            : [roles]
          ).map(String) as typeof roleEnum.enumValues[number][] 
        : undefined,
      page: page ? parseInt(page as string, 10) : 1,
      limit: limit ? parseInt(limit as string, 10) : 10,
    };

    const results = await searchProjects(filters);
    return res.json(results);
  } catch (error) {
    console.error('Error searching projects:', error);
    return res.status(500).json({ 
      message: 'Internal server error', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});
