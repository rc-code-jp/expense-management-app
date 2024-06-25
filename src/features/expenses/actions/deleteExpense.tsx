"use server";

import { auth } from "@/auth";
import { db } from "@/database/db";
import { expenses } from "@/database/schema";
import type { FormActionState } from "@/features/expenses/actionState/formActionState";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteExpense(
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

	const userId = session?.user?.id ?? "";

	await db
		.delete(expenses)
		.where(and(eq(expenses.userId, userId), eq(expenses.id, body.id)));

	revalidatePath("/expenses");

	return { message: "" };
}
