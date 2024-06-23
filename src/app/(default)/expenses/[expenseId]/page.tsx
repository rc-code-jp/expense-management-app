import { auth } from "@/auth";
import { db } from "@/database/db";
import { expenseCategories, expenses } from "@/database/schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function Page({
	params,
}: {
	params: {
		expenseId: string;
	};
}) {
	const session = await auth();
	if (!session) {
		return redirect("/auth/login");
	}

	const userId = session.user?.id ?? "";

	const res = await db
		.select()
		.from(expenses)
		.innerJoin(expenseCategories, eq(expenses.categoryId, expenseCategories.id))
		.where(and(eq(expenses.userId, userId), eq(expenses.id, params.expenseId)));

	const item = res[0];

	return (
		<div>
			<h1>History</h1>
			<div>{JSON.stringify(item)}</div>
		</div>
	);
}
