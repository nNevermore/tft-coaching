import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' }); // Ładujemy .env z folderu frontend

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'turso',
  dbCredentials: {
    url: (process.env.DATABASE_URL || process.env.TURSO_DB_URL)!,
    authToken: (process.env.TURSO_DB_TOKEN || process.env.TURSO_API_TOKEN)!,
  },
});
