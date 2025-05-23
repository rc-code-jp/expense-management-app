import { auth } from "@/auth";
import { PageTitle } from "@/components/layout/PageTitle";
import { db } from "@/database/db";
import { expenses } from "@/database/schema";
import getExpenseCategoryList from "@/features/expenses/actions/getExpenseCategoryList";
import { CategoryFilter } from "@/features/expenses/components/CategoryFilter";
import { ExpenseCalendar } from "@/features/expenses/components/ExpenseCalendar";
import { DATE_FORMAT, dateFns, getTimezoneNow } from "@/lib/dateFns";
import { and, between, eq } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{
		ym?: string; // y-m
		category?: string; // expenseCategories.id
	}>;
}) {
	const session = await auth();
	if (!session) {
		return redirect("/auth/login");
	}

	const user = session.user;

	const date = getTimezoneNow();
	date.setDate(1);

	const sp = await searchParams;

	const ym = sp.ym?.split("-").map(Number);
	if (ym?.at(0) && ym?.at(1)) {
		date.setFullYear(ym[0]);
		date.setMonth(ym[1] - 1);
	}

	const startDateStr = dateFns.format(date, DATE_FORMAT);
	const endDateStr = dateFns.format(dateFns.lastDayOfMonth(date), DATE_FORMAT);

	// 条件
	const where = [
		eq(expenses.userId, user.id),
		between(expenses.date, startDateStr, endDateStr),
	];

	// 条件にカテゴリーを追加
	if (sp.category) {
		where.push(eq(expenses.categoryId, sp.category));
	}

	// 取得（集計用なので並び替えない）
	const items = await db
		.select()
		.from(expenses)
		.where(and(...where));

	const year = Number(dateFns.format(date, "yyyy"));
	const month = Number(dateFns.format(date, "M"));

	const total = items.reduce((sum, item) => sum + item.amount, 0);

	// カテゴリー取得
	const categories = await getExpenseCategoryList();

	// 遷移用に前月と次月のリンクを生成
	const prevYm = dateFns.format(dateFns.addMonths(date, -1), "yyyy-M");
	const nextYm = dateFns.format(dateFns.addMonths(date, 1), "yyyy-M");

	return (
		<div>
			<PageTitle>
				<Link href={`/calendar?ym=${prevYm}`} className="-mt-1 font-normal">
					&lt;-
				</Link>
				<span className="mx-3">
					{year}年{month}月
				</span>
				<Link href={`/calendar?ym=${nextYm}`} className="-mt-1 font-normal">
					-&gt;
				</Link>
			</PageTitle>
			<div className="mb-2 flex flex-nowrap items-center justify-between pl-3">
				<p>合計: {total.toLocaleString()}</p>
				<CategoryFilter items={categories} initialValue={sp.category} />
			</div>
			<ExpenseCalendar items={items} year={year} month={month} />
		</div>
	);
}
