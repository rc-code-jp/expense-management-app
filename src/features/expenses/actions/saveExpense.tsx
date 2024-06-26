"use server";

import { auth } from "@/auth";
import { db } from "@/database/db";
import { expenses } from "@/database/schema";
import type { FormActionState } from "@/features/expenses/actionState/formActionState";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function saveExpense(
	_: FormActionState,
	data: FormData,
): Promise<FormActionState> {
	const session = await auth();
	if (!session) {
		return { message: "Not Authenticated" };
	}

	const body = {
		id: data.get("id") as string | null,
		amount: Number(data.get("amount")),
		categoryId: data.get("categoryId") as string,
		date: data.get("date") as string,
		time: data.get("time") as string,
		note: data.get("note") as string,
	};

	// 簡易的なバリデーション（zodなどでやるのがベスト）
	if (Number.isNaN(body.amount) || body.amount <= 0) {
		return { message: "Please enter an amount greater than or equal to 0" };
	}

	if (!body.date) {
		return { message: "Please enter the date" };
	}

	if (!body.categoryId) {
		return { message: "Choose a category" };
	}

	const userId = session?.user?.id ?? "";

	if (body.id) {
		await db
			.update(expenses)
			.set({
				userId: userId,
				categoryId: body.categoryId,
				amount: body.amount,
				date: body.date,
				time: body.time || null,
				note: body.note,
			})
			.where(and(eq(expenses.userId, userId), eq(expenses.id, body.id)));
	} else {
		await db.insert(expenses).values({
			userId: userId,
			categoryId: body.categoryId,
			amount: body.amount,
			date: body.date,
			time: body.time || null,
			note: body.note,
		});
	}

	redirect("/expenses");
}
