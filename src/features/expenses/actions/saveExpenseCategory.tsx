"use server";

import { auth } from "@/auth";
import { db } from "@/database/db";
import { expenseCategories } from "@/database/schema";
import type { FormActionState } from "@/features/expenses/actionState/formActionState";
import { and, desc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { INITIAL_SORT_VALUE } from "../utils/categorySort";

export async function saveExpenseCategory(
	_: FormActionState,
	data: FormData,
): Promise<FormActionState> {
	const session = await auth();
	if (!session) {
		return { message: "Not Authenticated" };
	}

	const body = {
		id: data.get("id") as string | null,
		name: data.get("name") as string,
		color: data.get("color") as string,
	};

	if (!body.name) {
		return { message: "Please enter the name" };
	}

	const user = session.user;

	if (body.id) {
		// 更新
		await db
			.update(expenseCategories)
			.set({
				name: body.name,
				color: body.color,
			})
			.where(
				and(
					eq(expenseCategories.userId, user.id),
					eq(expenseCategories.id, body.id),
				),
			);
	} else {
		// sortの最大値を取得
		const maxSortItem = (
			await db
				.select()
				.from(expenseCategories)
				.where(eq(expenseCategories.userId, user.id))
				.orderBy(desc(expenseCategories.sort))
				.limit(1)
		)[0];
		const maxSort = maxSortItem ? Number(maxSortItem.sort) : 0;

		// 作成
		await db.insert(expenseCategories).values({
			userId: user.id,
			name: body.name,
			color: body.color,
			sort: String(Math.floor(maxSort) + INITIAL_SORT_VALUE),
		});
	}

	redirect("/categories");
}
