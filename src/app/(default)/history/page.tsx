import { auth } from "@/auth";
import { PageTitle } from "@/components/layout/PageTitle";
import { db } from "@/database/db";
import { expenseCategories, expenses } from "@/database/schema";
import { ExpenseList } from "@/features/expenses/components/ExpenseList";
import { EXPENSE_LIST_LIMIT } from "@/features/expenses/utils/expenseList";
import { dateFns } from "@/lib/dateFns";
import { and, desc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function Page({
	searchParams,
}: {
	searchParams: {
		date?: string;
	};
}) {
	const session = await auth();
	if (!session) {
		return redirect("/auth/login");
	}

	const user = session.user;

	// 条件
	const where = [eq(expenses.userId, user.id)];

	// 日付指定
	const dateStr = "";
	if (searchParams.date) {
		const date = new Date(searchParams.date);
		const dateStr = dateFns.format(date, "yyyy-MM-dd");
		where.push(eq(expenses.date, dateStr));
	}

	const items = await db
		.select()
		.from(expenses)
		.where(and(...where))
		.innerJoin(expenseCategories, eq(expenses.categoryId, expenseCategories.id))
		.orderBy(desc(expenses.date), desc(expenses.time))
		.limit(EXPENSE_LIST_LIMIT);

	return (
		<div>
			<PageTitle>History</PageTitle>
			<div>
				<p className="text-center text-xs">{dateStr || "Recent"}</p>
			</div>
			<ExpenseList items={items} />
		</div>
	);
}
