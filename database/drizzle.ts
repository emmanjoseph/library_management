import config from '@/lib/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

export const sql = neon(config.env.databaseUrl)
export const db = drizzle(config.env.databaseUrl);
