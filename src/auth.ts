import { db } from "@/database/db";
import {
	accounts,
	sessions,
	users,
	verificationTokens,
} from "@/database/schema";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const { handlers, auth } = NextAuth({
	adapter: DrizzleAdapter(db, {
		usersTable: users,
		accountsTable: accounts,
		sessionsTable: sessions,
		verificationTokensTable: verificationTokens,
	}),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID ?? "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
		}),
	],
	callbacks: {
		async session({ session, user }) {
			if (session?.user) {
				session.user.id = user.id;
			}
			return session;
		},
	},
	pages: {
		signIn: "/auth/login",
		signOut: "/auth/login",
		error: "/auth/login",
	},
});
