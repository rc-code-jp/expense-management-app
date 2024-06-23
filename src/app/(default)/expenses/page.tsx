import { auth } from "@/auth";
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
			<h1>History</h1>
			<ExpenseList items={items} />
		</div>
	);
}
