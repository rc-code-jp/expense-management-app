import { auth } from "@/auth";
import { db } from "@/database/db";
import { expenseCategories, expenses } from "@/database/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const deleteExpenseCategory = async (data: FormData) => {
	"use server";
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
		.where(
			and(
				eq(expenseCategories.userId, userId),
				eq(expenseCategories.id, body.id),
			),
		);

	revalidatePath("/categories");
};
