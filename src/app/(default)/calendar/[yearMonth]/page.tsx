import { auth } from "@/auth";
import { PageTitle } from "@/components/layout/PageTitle";
import { db } from "@/database/db";
import { expenses } from "@/database/schema";
import { ExpenseCalendar } from "@/features/expenses/components/ExpenseCalendar";
import { dateFns } from "@/lib/dateFns";
import { and, between, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function Page({
	params,
}: {
	params: {
		yearMonth: string; // y-m
	};
}) {
	const session = await auth();
	if (!session) {
		return redirect("/auth/login");
	}

	const user = session.user;

	const [year, month] = params.yearMonth.split("-").map(Number);

	const date = new Date(year, month - 1, 1);
	const startDateStr = dateFns.format(date, "yyyy-MM-dd");
	const endDateStr = dateFns.format(dateFns.lastDayOfMonth(date), "yyyy-MM-dd");

	// 取得（集計用なので並び替えない）
	const items = await db
		.select()
		.from(expenses)
		.where(
			and(
				eq(expenses.userId, user.id),
				between(expenses.date, startDateStr, endDateStr),
			),
		);

	return (
		<div>
			<PageTitle>
				{year}-{month}
			</PageTitle>
			<ExpenseCalendar items={items} year={year} month={month} />
		</div>
	);
}
