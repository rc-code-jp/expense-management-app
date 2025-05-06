import { auth } from "@/auth";
import { PageTitle } from "@/components/layout/PageTitle";
import { db } from "@/database/db";
import { expenseCategories, expenses } from "@/database/schema";
import { ExpenseForm } from "@/features/expenses/components/ExpenseForm";
import { and, asc, desc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function Page({
	params,
}: {
	params: Promise<{
		expenseId: string;
	}>;
}) {
	const session = await auth();
	if (!session) {
		return redirect("/auth/login");
	}

	const p = await params;

	const user = session.user;

	const categoryList = await db
		.select()
		.from(expenseCategories)
		.where(eq(expenseCategories.userId, user.id))
		.orderBy(asc(expenseCategories.sort), desc(expenseCategories.createdAt));

	const res = await db
		.select()
		.from(expenses)
		.where(and(eq(expenses.userId, user.id), eq(expenses.id, p.expenseId)));

	const item = res[0];

	return (
		<div>
			<PageTitle>編集</PageTitle>
			<ExpenseForm categoryList={categoryList} item={item} />
		</div>
	);
}
