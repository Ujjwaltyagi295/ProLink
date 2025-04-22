import { defineConfig } from "drizzle-kit";
import "dotenv/config";
export default defineConfig({
  out: "./drizzle",
  schema: [
    "./src/models/projectEnums.ts",
    "./src/models/user.model.ts",
    "./src/models/session.model.ts",
    
    "./src/models/project.model.ts",
    "./src/models/projectApplications.ts",
    "./src/models/projectTechStack.ts",
    "./src/models/projectRoles.ts",
    "./src/models/projectMembers.ts",
    "./src/models/userProfile.ts",
    "./src/models/projectApplications.ts"
  ],
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URI!,
  },
});
