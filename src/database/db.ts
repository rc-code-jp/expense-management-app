import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

// const pool = new Pool({
// 	connectionString: process.env.DATABASE_URL ?? "",
// });

export const poolConfig = {
	host: "localhost",
	port: 5432,
	user: "user",
	password: "password",
	database: "expense-management-app",
	ssl: false,
};

// or
const pool = new Pool(poolConfig);

export const db = drizzle(pool);
