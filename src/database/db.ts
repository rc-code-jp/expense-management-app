import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!
});

// or
// const pool = new Pool({
//   host: "127.0.0.1",
//   port: 5432,
//   user: "postgres",
//   password: "password",
//   database: "db_name",
// });

export const db = drizzle(pool);
