import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from "./db";

console.log("Running migrations...");

migrate(db, { migrationsFolder: "./migrations" })
	.then(() => {
		console.log("Migrations complete!");
		process.exit(0);
	})
	.catch((err) => {
		console.error("Migrations failed!", err);
		process.exit(1);
	});
