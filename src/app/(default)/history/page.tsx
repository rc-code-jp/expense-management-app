import { auth } from "@/auth";
import { PageTitle } from "@/components/layout/PageTitle";
import { db } from "@/database/db";
import { expenseCategories, expenses } from "@/database/schema";
import { ExpenseList } from "@/features/expenses/components/ExpenseList";
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

	const userId = session.user?.id ?? "";

	let dateStr = "";
	const paramDateArr = searchParams.date?.split("-") ?? [];
	if (paramDateArr.length > 0) {
		const date = new Date();
		if (paramDateArr[0]) {
			date.setFullYear(Number.parseInt(paramDateArr[0], 10));
		}
		if (paramDateArr[1]) {
			date.setMonth(Number.parseInt(paramDateArr[1], 10) - 1);
		}
		if (paramDateArr[2]) {
			date.setDate(Number.parseInt(paramDateArr[2], 10));
		}
		dateStr = dateFns.format(date, "yyyy-MM-dd");
	}

	const where = [eq(expenses.userId, userId)];
	if (dateStr) {
		where.push(eq(expenses.date, dateStr));
	}

	const items = await db
		.select()
		.from(expenses)
		.where(and(...where))
		.innerJoin(expenseCategories, eq(expenses.categoryId, expenseCategories.id))
		.orderBy(desc(expenses.date), desc(expenses.time))
		.limit(20);

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
