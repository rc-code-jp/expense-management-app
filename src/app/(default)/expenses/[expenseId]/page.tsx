import { auth } from "@/auth";
import { PageTitle } from "@/components/layout/PageTitle";
import { db } from "@/database/db";
import { expenseCategories, expenses } from "@/database/schema";
import { ExpenseRegisterForm } from "@/features/expenses/components/ExpenseRegisterForm";
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

	const categoryList = await db
		.select()
		.from(expenseCategories)
		.where(eq(expenseCategories.userId, userId));

	const res = await db
		.select()
		.from(expenses)
		.where(and(eq(expenses.userId, userId), eq(expenses.id, params.expenseId)));

	const item = res[0];

	return (
		<div>
			<PageTitle>History</PageTitle>
			<ExpenseRegisterForm categoryList={categoryList} item={item} />
		</div>
	);
}
