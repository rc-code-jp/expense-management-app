"use server";

import { auth } from "@/auth";
import { db } from "@/database/db";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function saveMonthlyBudget(data: FormData) {
	const session = await auth();
	if (!session) {
		return { message: "Not Authenticated" };
	}

	const user = session.user;

	const body = {
		monthlyBudget: Number(data.get("monthlyBudget")),
	};

	// 簡易的なバリデーション（zodなどでや1るのがベスト）
	if (Number.isNaN(body.monthlyBudget) || body.monthlyBudget <= 0) {
		return { message: "Please enter an amount greater than or equal to 0" };
	}

	// 保存
	await db
		.update(users)
		.set({ monthlyBudget: body.monthlyBudget })
		.where(eq(users.id, user.id));

	revalidatePath("/report");

	return { message: "" };
}
