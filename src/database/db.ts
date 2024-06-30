import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

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

export const db = drizzle(pool, {
	logger: process.env.DB_LOG === "true",
});
