"use client";

import type { expenseCategories, expenses } from "@/database/schema";
import { dateFns } from "@/lib/dateFns";
import Link from "next/link";
import { useState } from "react";
import getExpenseList from "../../actions/getExpenseList";
import { EXPENSE_LIST_LIMIT } from "../../utils/expenseList";

type Item = {
	expenses: typeof expenses.$inferSelect;
	expenseCategories: typeof expenseCategories.$inferSelect;
};

export function ExpenseList({
	items,
	searchParams,
}: {
	items: Item[];
	searchParams?: { startDate?: string; endDate?: string; category?: string };
}) {
	const [displayItems, setDisplayItems] = useState<Item[]>(items);
	const [noMore, setNoMore] = useState(items.length < EXPENSE_LIST_LIMIT);
	const [moreBusy, setMoreBusy] = useState(false);

	const getMoreItems = async () => {
		if (moreBusy || noMore) return;
		setMoreBusy(true);
		const offset = displayItems.length;
		const res = await getExpenseList({
			offset,
			limit: EXPENSE_LIST_LIMIT,
			...searchParams,
		});
		setDisplayItems([...displayItems, ...res.items]);
		setNoMore(res.items.length < EXPENSE_LIST_LIMIT);
		setMoreBusy(false);
	};

	return (
		<ul>
			{displayItems.map((item) => (
				<li key={item.expenses.id} style={{ marginTop: 10 }}>
					<div className="relative size-full rounded-md border border-primary/5 p-4 shadow-md hover:opacity-50">
						<div className="font-bold text-xs">
							{dateFns.format(new Date(item.expenses.date), "yyyy-MM-dd E")}
						</div>
						<div className="mt-1 font-bold text-md">
							{item.expenses.amount.toLocaleString()}
						</div>
						<p
							className="mt-1 text-xs"
							style={{
								color: item.expenseCategories.color ?? undefined,
							}}
						>
							{item.expenseCategories.name}
						</p>
						{/* ノートがある場合はアイコンを表示 */}
						{item.expenses.note && (
							<svg
								role="img"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="pointer-events-none absolute top-1 right-1 size-4"
								aria-label="with note"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
								/>
							</svg>
						)}

						{/* 右端に編集ボタンを設置 */}
						<div className="-translate-y-1/2 absolute top-1/2 right-2">
							<Link
								type="button"
								className="btn btn-primary btn-outline btn-xs"
								href={`/expenses/${item.expenses.id}`}
							>
								Edit
							</Link>
						</div>
					</div>
				</li>
			))}
			{/* もっと見るボタン */}
			<li className="my-4">
				<button
					type="button"
					className="btn btn-ghost btn-block"
					onClick={getMoreItems}
					disabled={noMore || moreBusy}
				>
					{noMore ? "No more" : moreBusy ? "Loading..." : "More"}
				</button>
			</li>
		</ul>
	);
}
