import { defineConfig } from 'drizzle-kit';
import "dotenv/config"
export default defineConfig({
  out: './drizzle',
  schema: ['./src/models/user.model.ts','./src/models/session.model.ts'],
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URI!,
  },
});
