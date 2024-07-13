"use server";

import { auth } from "@/auth";
import { db } from "@/database/db";
import { expenseCategories } from "@/database/schema";
import { and, asc, desc, eq, isNull } from "drizzle-orm";

type Item = typeof expenseCategories.$inferSelect;

export default async function getExpenseCategoryList(): Promise<Item[]> {
	const session = await auth();
	if (!session) {
		return [];
	}

	const user = session.user;

	const items = await db
		.select()
		.from(expenseCategories)
		.where(
			and(
				eq(expenseCategories.userId, user.id),
				isNull(expenseCategories.deletedAt),
			),
		)
		.orderBy(asc(expenseCategories.sort), desc(expenseCategories.createdAt));

	return items;
}
