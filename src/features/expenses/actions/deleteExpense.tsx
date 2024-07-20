"use server";

import { auth } from "@/auth";
import { db } from "@/database/db";
import { expenses } from "@/database/schema";
import { and, eq } from "drizzle-orm";

export async function deleteExpense(expenseId: string): Promise<{
	message: string;
}> {
	const session = await auth();
	if (!session) {
		return Promise.reject({ message: "Not Authenticated" });
	}

	const user = session.user;

	await db
		.delete(expenses)
		.where(and(eq(expenses.userId, user.id), eq(expenses.id, expenseId)));

	return Promise.resolve({ message: "" });
}
