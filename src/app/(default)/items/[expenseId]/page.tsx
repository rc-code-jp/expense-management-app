import { auth } from "@/auth";
import { PageTitle } from "@/components/layout/PageTitle";
import { db } from "@/database/db";
import { expenseCategories, expenses } from "@/database/schema";
import { ExpenseForm } from "@/features/expenses/components/ExpenseForm";
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

	const user = session.user;

	const categoryList = await db
		.select()
		.from(expenseCategories)
		.where(eq(expenseCategories.userId, user.id));

	const res = await db
		.select()
		.from(expenses)
		.where(
			and(eq(expenses.userId, user.id), eq(expenses.id, params.expenseId)),
		);

	const item = res[0];

	return (
		<div>
			<PageTitle>Update Item</PageTitle>
			<ExpenseForm categoryList={categoryList} item={item} />
		</div>
	);
}
