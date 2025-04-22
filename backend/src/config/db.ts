import "dotenv/config"
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import { schema } from  '../models/index';
import { DATABASE_URI } from '../constants/env';

const pool = new pg.Pool({
  connectionString: DATABASE_URI
});

export const db = drizzle(pool,{schema});