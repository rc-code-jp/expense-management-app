import { auth } from "@/auth";
import { db } from "@/database/db";
import { expenses } from "@/database/schema";
import { ReportItem } from "@/features/expenses/components/ReportItem";
import { dateFns, getTimezoneNow } from "@/lib/dateFns";
import { and, between, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function Page() {
	const session = await auth();
	if (!session) {
		return redirect("/auth/login");
	}

	const user = session.user;

	const dateFormat = "yyyy-MM-dd";

	// 今月の1日を取得
	const firstDay = dateFns.startOfMonth(getTimezoneNow());
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
				eq(expenses.userId, user.id),
				between(expenses.date, firstDayString, lastDayString),
			),
		);

	const now = getTimezoneNow();
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

	// トータル
	const monthSum = items.reduce((sum, v) => sum + v.amount, 0);
	const weekSum = items
		.filter((v) => weekStartStr <= v.date && v.date <= weekEndStr)
		.reduce((sum, v) => sum + v.amount, 0);
	const todaySum = items
		.filter((v) => todayStr === v.date)
		.reduce((sum, v) => sum + v.amount, 0);

	// 基準日など
	const endOfMonth = dateFns.endOfMonth(now);
	const monthlyDaysLeft = dateFns.differenceInDays(endOfMonth, now) + 1;
	const endDayOfWeek = dateFns.endOfWeek(now);
	const endDayOfWeekInMonth =
		endDayOfWeek.getMonth() !== now.getMonth()
			? dateFns.endOfMonth(now)
			: endDayOfWeek;
	const startDayOfWeek = dateFns.startOfWeek(now);
	const startDayOfWeekInMonth =
		startDayOfWeek.getMonth() !== now.getMonth()
			? dateFns.startOfMonth(now)
			: startDayOfWeek;
	const weeklyDays =
		dateFns.differenceInDays(endDayOfWeekInMonth, startDayOfWeekInMonth) + 1;
	const monthlyDaysLeftFromStartWeek =
		dateFns.differenceInDays(endOfMonth, startDayOfWeekInMonth) + 1;

	// 予算から残高や使用率を計算
	const monthlyBudget = user.monthlyBudget || 0;
	// 今月の残高
	const monthlyBalance = monthlyBudget - monthSum;
	// 今週の予算（今週は含めない）
	const weeklyBudget =
		Math.floor((monthlyBalance + weekSum) / monthlyDaysLeftFromStartWeek) *
		weeklyDays;
	// 今日の予算（今日は含めない）
	const todayBudget = Math.floor((monthlyBalance + todaySum) / monthlyDaysLeft);

	return (
		<div>
			<div className="flex flex-col">
				<h2 className="p-2 pt-0 font-bold text-lg">Monthly</h2>
				<ReportItem sum={monthSum} budget={monthlyBudget} />
				<h2 className="mt-2 p-2 font-bold text-lg">Weekly</h2>
				<ReportItem sum={weekSum} budget={weeklyBudget} />
				<h2 className="mt-2 p-2 font-bold text-lg">Today</h2>
				<ReportItem sum={todaySum} budget={todayBudget} />
			</div>
		</div>
	);
}
