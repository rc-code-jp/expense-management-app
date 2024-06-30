"use server";

import { auth } from "@/auth";
import { db } from "@/database/db";
import { expenseCategories, expenses } from "@/database/schema";
import { dateFns } from "@/lib/dateFns";
import { and, desc, eq } from "drizzle-orm";

type Item = {
	expenses: typeof expenses.$inferSelect;
	expenseCategories: typeof expenseCategories.$inferSelect;
};

export default async function getExpenseList(params: {
	offset: number;
	limit: number;
	date?: string;
}): Promise<{ items: Item[] }> {
	const session = await auth();
	if (!session) {
		return { items: [] };
	}

	const user = session.user;

	// 条件
	const where = [eq(expenses.userId, user.id)];

	// 日付指定
	if (params.date) {
		const date = new Date(params.date);
		where.push(eq(expenses.date, dateFns.format(date, "yyyy-MM-dd")));
	}

	const items = await db
		.select()
		.from(expenses)
		.where(and(...where))
		.innerJoin(expenseCategories, eq(expenses.categoryId, expenseCategories.id))
		.orderBy(desc(expenses.date), desc(expenses.time))
		.offset(params.offset)
		.limit(params.limit);

	return { items: items };
}
