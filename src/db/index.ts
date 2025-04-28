import { eq, inArray } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { envs } from '../core/config';
import * as schema from './schema';

export const db = drizzle(envs.DATABASE_URL, { schema });