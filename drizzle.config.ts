import { defineConfig } from 'drizzle-kit';
import { envs } from './src/core/config';

export default defineConfig({
  out: './src/db/migrations',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: envs.DATABASE_URL,
  }
});