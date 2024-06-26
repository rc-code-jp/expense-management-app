import { auth } from "@/auth";
import { PageTitle } from "@/components/layout/PageTitle";
import { db } from "@/database/db";
import { expenseCategories, expenses } from "@/database/schema";
import { ExpenseList } from "@/features/expenses/components/ExpenseList";
import { desc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function Page() {
	const session = await auth();
	if (!session) {
		return redirect("/auth/login");
	}

	const userId = session.user?.id ?? "";

	const items = await db
		.select()
		.from(expenses)
		.where(eq(expenses.userId, userId))
		.innerJoin(expenseCategories, eq(expenses.categoryId, expenseCategories.id))
		.orderBy(desc(expenses.date), desc(expenses.time));

	return (
		<div>
			<PageTitle>History</PageTitle>
			<ExpenseList items={items} />
			<div className="pt-20" />
		</div>
	);
}
