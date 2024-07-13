"use server";

import { auth } from "@/auth";
import { db } from "@/database/db";
import { expenseCategories, expenses } from "@/database/schema";
import { DATE_FORMAT, dateFns } from "@/lib/dateFns";
import { and, between, desc, eq } from "drizzle-orm";

type Item = {
	expenses: typeof expenses.$inferSelect;
	expenseCategories: typeof expenseCategories.$inferSelect;
};

export default async function getExpenseList(params: {
	offset: number;
	limit: number;
	startDate?: string;
	endDate?: string;
	categoryId?: string;
}): Promise<{
	message?: string;
	items: Item[];
	startDate?: string;
	endDate?: string;
}> {
	// endDateがある場合はstartDateも必須
	if (params.endDate && !params.startDate) {
		return { message: "startDate is required", items: [] };
	}

	const session = await auth();
	if (!session) {
		return { items: [] };
	}

	const user = session.user;

	// 条件
	const where = [eq(expenses.userId, user.id)];

	// 日付指定
	let startDateStr = "";
	let endDateStr = "";
	if (params.startDate) {
		const _startDate = new Date(params.startDate);
		const _endDate = params.endDate ? new Date(params.endDate) : _startDate;
		startDateStr = dateFns.format(_startDate, DATE_FORMAT);
		endDateStr = dateFns.format(_endDate, DATE_FORMAT);
		where.push(between(expenses.date, startDateStr, endDateStr));
	}

	const items = await db
		.select()
		.from(expenses)
		.where(and(...where))
		.innerJoin(expenseCategories, eq(expenses.categoryId, expenseCategories.id))
		.orderBy(desc(expenses.date), desc(expenses.time))
		.offset(params.offset)
		.limit(params.limit);

	return { items: items, startDate: startDateStr, endDate: endDateStr };
}
