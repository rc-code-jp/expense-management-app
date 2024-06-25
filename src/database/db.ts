import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

// const pool = new Pool({
// 	connectionString: process.env.DATABASE_URL ?? "",
// });

export const poolConfig = {
	host: process.env.DB_HOST ?? "",
	port: Number(process.env.DB_PORT),
	user: process.env.DB_USER ?? "",
	password: process.env.DB_PASSWORD ?? "",
	database: process.env.DB_NAME ?? "",
	ssl: process.env.DB_SSL === "true",
};

// or
const pool = new Pool(poolConfig);

export const db = drizzle(pool);
