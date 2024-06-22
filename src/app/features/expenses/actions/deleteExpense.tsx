import { auth } from "@/auth";
import { db } from "@/database/db";
import { expenses } from "@/database/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const deleteExpense = async (data: FormData) => {
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
		.where(and(eq(expenses.userId, userId), eq(expenses.id, body.id)));

	revalidatePath("/expenses");
};
