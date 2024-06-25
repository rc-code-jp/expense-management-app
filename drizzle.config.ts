import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env" });

export default defineConfig({
	schema: "./src/database/schema.ts",
	out: "./src/database/migrations",
	dialect: "postgresql",
	dbCredentials: {
		host: process.env.DB_HOST ?? "",
		port: Number(process.env.DB_PORT),
		user: process.env.DB_USER ?? "",
		password: process.env.DB_PASSWORD ?? "",
		database: process.env.DB_NAME ?? "",
		ssl: process.env.DB_SSL === "true",
	},
});
