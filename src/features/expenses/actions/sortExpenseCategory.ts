"use server";

import { auth } from "@/auth";
import { db } from "@/database/db";
import { expenseCategories } from "@/database/schema";
import { and, desc, eq, isNull } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { INITIAL_SORT_VALUE } from "../utils/categorySort";

export async function sortExpenseCategory(params: {
	categoryId: string;
	prevId?: string;
	nextId?: string;
}) {
	const session = await auth();
	if (!session) {
		return { message: "Not Authenticated" };
	}

	const user = session.user;

	let prevItemSort = 0;
	if (params.prevId) {
		const prevItem = (
			await db
				.select()
				.from(expenseCategories)
				.where(
					and(
						eq(expenseCategories.userId, user.id),
						eq(expenseCategories.id, params.prevId),
					),
				)
		)[0];
		if (!prevItem) {
			return { message: "Task not found" };
		}
		prevItemSort = Number(prevItem.sort);
	}

	let nextItemSort = INITIAL_SORT_VALUE;
	if (params.nextId) {
		const nextItem = (
			await db
				.select()
				.from(expenseCategories)
				.where(
					and(
						eq(expenseCategories.userId, user.id),
						eq(expenseCategories.id, params.nextId),
					),
				)
		)[0];
		if (!nextItem) {
			return { message: "Task not found" };
		}
		nextItemSort = Number(nextItem.sort);
	} else {
		const maxSortItem = (
			await db
				.select()
				.from(expenseCategories)
				.where(
					and(
						eq(expenseCategories.userId, user.id),
						isNull(expenseCategories.deletedAt),
					),
				)
				.orderBy(desc(expenseCategories.sort))
				.limit(1)
		)[0];
		const maxSort = maxSortItem ? Number(maxSortItem.sort) : 0;
		nextItemSort = maxSort + INITIAL_SORT_VALUE;
	}

	const newSort = (prevItemSort + nextItemSort) / 2;

	// 更新
	await db
		.update(expenseCategories)
		.set({
			sort: String(newSort),
		})
		.where(
			and(
				eq(expenseCategories.userId, user.id),
				eq(expenseCategories.id, params.categoryId),
			),
		);

	revalidatePath("/categories");

	return { message: "" };
}
