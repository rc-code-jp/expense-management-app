"use client";

import type { expenses } from "@/database/schema";
import { DATE_FORMAT, WEEK_ARRAY, dateFns } from "@/lib/dateFns";
import Link from "next/link";

export function ExpenseCalendar({
	items,
	year,
	month,
}: {
	items: (typeof expenses.$inferSelect)[];
	year: number;
	month: number;
}) {
	// 日付
	const date = new Date(year, month - 1, 1);
	const startDateStr = dateFns.format(date, DATE_FORMAT);
	const endDateStr = dateFns.format(dateFns.lastDayOfMonth(date), DATE_FORMAT);

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

	return (
		<div className="flex flex-row flex-wrap">
			{[...Array(7)].map((_, w) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
				<div key={w} className="w-[calc(100%_/_7)] text-center font-bold">
					{WEEK_ARRAY[w]}
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
					DATE_FORMAT,
				);
				return (
					<Link
						key={day}
						href={`/items?date=${date}`}
						prefetch={false}
						className="block w-[calc(100%_/_7)] text-center hover:shadow-inner"
					>
						<p>{day}</p>
						<p className="h-10 font-bold text-primary text-xs">
							{(total[date] ?? "").toLocaleString()}
						</p>
					</Link>
				);
			})}
			{[...Array(endPad)].map((_, i) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
				<div key={i} className="w-[calc(100%_/_7)]">
					&nbsp;
				</div>
			))}
		</div>
	);
}
