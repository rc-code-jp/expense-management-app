"use server";

import { auth } from "@/auth";
import { db } from "@/database/db";
import { expenseCategories } from "@/database/schema";
import type { FormActionState } from "@/features/expenses/actionState/formActionState";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteExpenseCategory(
	_: FormActionState,
	data: FormData,
): Promise<FormActionState> {
	const body = {
		id: data.get("id") as string,
	};

	const session = await auth();
	if (!session) {
		return { message: "Not Authenticated" };
	}

	const user = session.user;

	// 論理削除
	await db
		.update(expenseCategories)
		.set({ deletedAt: new Date() })
		.where(
			and(
				eq(expenseCategories.userId, user.id),
				eq(expenseCategories.id, body.id),
			),
		);

	revalidatePath("/categories");

	return { message: "" };
}
