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

	// トータル
	const monthSum = items.reduce((sum, v) => sum + v.amount, 0);
	const weekSum = items
		.filter((v) => weekStartStr <= v.date && v.date <= weekEndStr)
		.reduce((sum, v) => sum + v.amount, 0);
	const todaySum = items
		.filter((v) => todayStr === v.date)
		.reduce((sum, v) => sum + v.amount, 0);

	// 残り金額
	const monthlyBudget = 150000; // 仮置き

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

	// 残高
	// 今月の残高
	const monthlyBalance = monthlyBudget - monthSum;
	// 今月の使用率
	const monthlyUseRate = Math.ceil((monthSum / monthlyBudget) * 100);
	// 今週の予算（今週は含めない）
	const weeklyBudget =
		Math.floor((monthlyBalance + weekSum) / monthlyDaysLeftFromStartWeek) *
		weeklyDays;
	// 今週の残高
	const weeklyBalance = weeklyBudget - weekSum;
	// 今週の使用率
	const weeklyUseRate = Math.ceil((weekSum / weeklyBudget) * 100);
	// 今日の予算（今日は含めない）
	const todayBudget = Math.floor((monthlyBalance + todaySum) / monthlyDaysLeft);
	// 今日の残高
	const todayBalance = todayBudget - todaySum;
	// 今日の使用率
	const todayUseRate = Math.ceil((todaySum / todayBudget) * 100);

	return (
		<div>
			<div>
				<p>今月の合計</p>
				<output>{monthSum.toLocaleString()} 円</output>
				<p>今月の残り</p>
				<output>{monthlyBalance.toLocaleString()} 円</output>
			</div>
			<hr />
			<div>
				<p>今週の合計</p>
				<output>{weekSum.toLocaleString()} 円</output>
				<p>今週の残り</p>
				<output>{weeklyBalance.toLocaleString()} 円</output>
			</div>
			<hr />
			<div>
				<p>本日の合計</p>
				<output>{todaySum.toLocaleString()} 円</output>
				<p>本日の残り</p>
				<output>{todayBalance.toLocaleString()} 円</output>
			</div>
		</div>
	);
}
