import { auth } from "@/auth";
import { db } from "@/database/db";
import { expenses } from "@/database/schema";
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

	const userId = session.user?.id ?? "";

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
				eq(expenses.userId, userId),
				between(expenses.date, startDateStr, endDateStr),
			),
		);

	// 日付毎に集計
	const total = items.reduce(
		(acc, item) => {
			const date = item.date;
			acc[date] = (acc[date] ?? 0) + item.amount;
			return acc;
		},
		{} as Record<string, number>,
	);

	// 月初の前の余白セル
	const startPad = Number(dateFns.format(startDateStr, "i")) - 1;

	// 月末の後の余白セル
	const endPad = 7 - Number(dateFns.format(endDateStr, "i"));

	const weekStr = ["月", "火", "水", "木", "金", "土", "日"];

	// カレンダーを構築して、合計金額を表示
	return (
		<div>
			<h1>
				{year}年{month}月
			</h1>
			<div className="flex flex-row flex-wrap">
				{[...Array(7)].map((_, w) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<div key={w} className="w-[calc(100%_/_7)] text-center">
						{weekStr[w]}
					</div>
				))}
				{[...Array(startPad)].map((_, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<div key={i} className="w-[calc(100%_/_7)]">
						&nbsp;
					</div>
				))}
				{Array.from({ length: dateFns.getDaysInMonth(date) }).map((_, i) => {
					const day = dateFns.format(new Date(year, month - 1, i + 1), "d");
					const date = dateFns.format(
						new Date(year, month - 1, i + 1),
						"yyyy-MM-dd",
					);
					return (
						<div key={day} className="w-[calc(100%_/_7)] text-center">
							<p>{day}</p>
							<p className="h-10 text-primary text-xs">
								{(total[date] ?? "").toLocaleString()}
							</p>
						</div>
					);
				})}
				{[...Array(endPad)].map((_, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<div key={i} className="w-[calc(100%_/_7)]">
						&nbsp;
					</div>
				))}
			</div>
		</div>
	);
}
