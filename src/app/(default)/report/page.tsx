import { auth } from "@/auth";
import { db } from "@/database/db";
import { expenses } from "@/database/schema";
import { dateFns, getNow } from "@/lib/dateFns";
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
	const firstDay = dateFns.startOfMonth(getNow());
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

	const now = getNow();
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
			{/* month */}
			<div className="flex flex-col">
				<h2 className="p-2 pt-0 font-bold text-lg">Monthly</h2>
				<div className="flex flex-nowrap gap-2">
					<div className="stats w-full shadow">
						<div className="stat place-items-center">
							<div className="stat-title">Total</div>
							<div className="stat-value text-xl">
								{monthSum.toLocaleString()}
							</div>
							<div className="stat-desc">{monthlyUseRate}% used</div>
						</div>
					</div>
					<div className="stats w-full shadow">
						<div className="stat place-items-center">
							<div className="stat-title">Balance</div>
							<div className="stat-value text-xl">
								{monthlyBalance.toLocaleString()}
							</div>
							<div className="stat-desc">{100 - monthlyUseRate}%</div>
						</div>
					</div>
				</div>
				{/* week */}
				<h2 className="mt-2 p-2 font-bold text-lg">Weekly</h2>
				<div className="flex flex-nowrap gap-2">
					<div className="stats w-full shadow">
						<div className="stat place-items-center">
							<div className="stat-title">Total</div>
							<div className="stat-value text-xl">
								{weekSum.toLocaleString()}
							</div>
							<div className="stat-desc">{weeklyUseRate}% used</div>
						</div>
					</div>
					<div className="stats w-full shadow">
						<div className="stat place-items-center">
							<div className="stat-title">Balance</div>
							<div className="stat-value text-xl">
								{weeklyBalance.toLocaleString()}
							</div>
							<div className="stat-desc">{100 - weeklyUseRate}%</div>
						</div>
					</div>
				</div>
				{/* today */}
				<h2 className="mt-2 p-2 font-bold text-lg">Today</h2>
				<div className="flex flex-nowrap gap-2">
					<div className="stats w-full shadow">
						<div className="stat place-items-center">
							<div className="stat-title">Total</div>
							<div className="stat-value text-xl">
								{todaySum.toLocaleString()}
							</div>
							<div className="stat-desc">{todayUseRate}% used</div>
						</div>
					</div>
					<div className="stats w-full shadow">
						<div className="stat place-items-center">
							<div className="stat-title">Balance</div>
							<div className="stat-value text-xl">
								{todayBalance.toLocaleString()}
							</div>
							<div className="stat-desc">{100 - todayUseRate}%</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
