import { poolConfig } from "@/database/db";
import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env" });

export default defineConfig({
	schema: "./src/database/schema.ts",
	out: "./src/database/migrations",
	dialect: "postgresql",
	dbCredentials: {
		...poolConfig,
	},
});
