import { auth } from "@/auth";
import { db } from "@/database/db";
import { expenses } from "@/database/schema";
import { redirect } from "next/navigation";

export const saveExpense = async (data: FormData) => {
	"use server";
	const body = {
		amount: Number(data.get("amount")),
		categoryId: data.get("categoryId") as string,
		date: data.get("date") as string,
		time: data.get("time") as string,
		note: data.get("note") as string,
	};

	// 簡易的なバリデーション（zodなどでやるのがベスト）
	if (Number.isNaN(body.amount) || body.amount <= 0) {
		return { message: "金額は0以上で入力してください" };
	}

	if (!body.date) {
		return { message: "日付を入力してください" };
	}

	if (!body.categoryId) {
		return { message: "カテゴリーを選択してください" };
	}

	const session = await auth();
	const userId = session?.user?.id ?? "";

	await db.insert(expenses).values({
		userId: userId,
		categoryId: body.categoryId,
		amount: body.amount,
		date: body.date,
		time: body.time || null,
		note: body.note,
	});

	redirect("/histories");
};
