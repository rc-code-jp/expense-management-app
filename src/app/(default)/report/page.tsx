import { auth } from "@/auth";
import { db } from "@/database/db";
import { expenses } from "@/database/schema";
import { dateFns } from "@/lib/dateFns";
import { and, between, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function Page() {
	const session = await auth();
	if (!session) {
		return redirect("/auth/login");
	}

	const userId = session.user?.id ?? "";

	const dateFormat = "yyyy-MM-dd";

	// 今月の1日を取得
	const firstDay = dateFns.startOfMonth(new Date());
	const firstDayString = dateFns.format(firstDay, dateFormat);
	// 今月の最終日を取得
	const lastDay = dateFns.endOfMonth(firstDay);
	const lastDayString = dateFns.format(lastDay, dateFormat);

	// 取得（集計用なので並び替えない）
	const items = await db
		.select()
		.from(expenses)
		.where(
			and(
				eq(expenses.userId, userId),
				between(expenses.date, firstDayString, lastDayString),
			),
		);

	const now = new Date();
	const todayStr = dateFns.format(now, dateFormat);
	const startOfWeek = dateFns.startOfWeek(now);
	const weekStartStr =
		startOfWeek.getMonth() !== now.getMonth()
			? dateFns.format(dateFns.startOfMonth(now), dateFormat)
			: dateFns.format(startOfWeek, dateFormat);
	const endOfWeek = dateFns.endOfWeek(now);
	const weekEndStr =
		endOfWeek.getMonth() !== now.getMonth()
			? dateFns.format(dateFns.endOfMonth(now), dateFormat)
			: dateFns.format(endOfWeek, dateFormat);

	const monthSum = items.reduce((sum, v) => sum + v.amount, 0);

	const weekSum = items
		.filter((v) => weekStartStr <= v.date && v.date <= weekEndStr)
		.reduce((sum, v) => sum + v.amount, 0);

	const todaySum = items
		.filter((v) => todayStr === v.date)
		.reduce((sum, v) => sum + v.amount, 0);

	return (
		<div>
			<div>
				<p>今月の合計</p>
				<output>{monthSum.toLocaleString()} 円</output>
			</div>
			<div>
				<p>今週の合計</p>
				<output>{weekSum.toLocaleString()} 円</output>
			</div>
			<div>
				<p>本日の合計</p>
				<output>{todaySum.toLocaleString()} 円</output>
			</div>
		</div>
	);
}
