import {
	boolean,
	date,
	decimal,
	integer,
	pgTable,
	primaryKey,
	text,
	time,
	timestamp,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

export const users = pgTable("users", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text("name"),
	email: text("email").notNull(),
	emailVerified: timestamp("emailVerified", { mode: "date" }),
	image: text("image"),
});

export const accounts = pgTable(
	"accounts",
	{
		userId: text("userId")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		type: text("type").$type<AdapterAccountType>().notNull(),
		provider: text("provider").notNull(),
		providerAccountId: text("providerAccountId").notNull(),
		refresh_token: text("refresh_token"), // next-authに合わせて一部SnakeCaseがある
		access_token: text("access_token"),
		expires_at: integer("expires_at"),
		token_type: text("token_type"),
		scope: text("scope"),
		id_token: text("id_token"),
		session_state: text("session_state"),
	},
	(account) => ({
		compoundKey: primaryKey({
			columns: [account.provider, account.providerAccountId],
		}),
	}),
);

export const sessions = pgTable("sessions", {
	sessionToken: text("sessionToken").primaryKey(),
	userId: text("userId")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
	"verificationToken",
	{
		identifier: text("identifier").notNull(),
		token: text("token").notNull(),
		expires: timestamp("expires", { mode: "date" }).notNull(),
	},
	(verificationToken) => ({
		compositePk: primaryKey({
			columns: [verificationToken.identifier, verificationToken.token],
		}),
	}),
);

export const authenticators = pgTable(
	"authenticators",
	{
		credentialID: text("credentialID").notNull().unique(),
		userId: text("userId")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		providerAccountId: text("providerAccountId").notNull(),
		credentialPublicKey: text("credentialPublicKey").notNull(),
		counter: integer("counter").notNull(),
		credentialDeviceType: text("credentialDeviceType").notNull(),
		credentialBackedUp: boolean("credentialBackedUp").notNull(),
		transports: text("transports"),
	},
	(authenticator) => ({
		compositePK: primaryKey({
			columns: [authenticator.userId, authenticator.credentialID],
		}),
	}),
);

// 支出
export const expenses = pgTable("expenses", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	userId: text("userId")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	amount: integer("amount").notNull(),
	categoryId: text("categoryId").notNull(),
	date: date("date").notNull(),
	time: time("time"),
	note: text("note"),
	createdAt: timestamp("createdAt", { mode: "date" }).$defaultFn(
		() => new Date(),
	),
	updatedAt: timestamp("updatedAt", { mode: "date" }).$defaultFn(
		() => new Date(),
	),
});

// 支出カテゴリー
export const expenseCategories = pgTable("expenseCategories", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	userId: text("userId")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	name: text("name").notNull(),
	color: text("color"),
	sort: decimal("sort").notNull(),
	createdAt: timestamp("createdAt", { mode: "date" }).$defaultFn(
		() => new Date(),
	),
	updatedAt: timestamp("updatedAt", { mode: "date" }).$defaultFn(
		() => new Date(),
	),
});
