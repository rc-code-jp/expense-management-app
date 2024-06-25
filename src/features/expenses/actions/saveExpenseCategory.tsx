"use server";

import { auth } from "@/auth";
import { db } from "@/database/db";
import { expenseCategories } from "@/database/schema";
import type { FormActionState } from "@/features/expenses/actionState/formActionState";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

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

	const userId = session?.user?.id ?? "";

	if (body.id) {
		await db
			.update(expenseCategories)
			.set({
				name: body.name,
				color: body.color,
				sort: 0,
			})
			.where(
				and(
					eq(expenseCategories.userId, userId),
					eq(expenseCategories.id, body.id),
				),
			);
	} else {
		await db.insert(expenseCategories).values({
			userId: userId,
			name: body.name,
			color: body.color,
			sort: 0,
		});
	}

	redirect("/categories");
}
