import { ExpenseList } from "@/app/features/expenses/components/ExpenseList";
import { auth } from "@/auth";
import { db } from "@/database/db";
import { expenseCategories, expenses } from "@/database/schema";
import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
	const session = await auth();
	if (!session) {
		// not authenticated
		return redirect("/");
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
			<div>
				<Link href="/expenses/register">登録</Link>
			</div>
		</div>
	);
}
