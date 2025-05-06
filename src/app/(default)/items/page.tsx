import { auth } from "@/auth";
import { PageTitle } from "@/components/layout/PageTitle";
import getExpenseCategoryList from "@/features/expenses/actions/getExpenseCategoryList";
import getExpenseList from "@/features/expenses/actions/getExpenseList";
import { CategoryFilter } from "@/features/expenses/components/CategoryFilter";
import { ExpenseList } from "@/features/expenses/components/ExpenseList";
import { EXPENSE_LIST_LIMIT } from "@/features/expenses/utils/expenseList";
import { redirect } from "next/navigation";

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{
		date?: string;
		category?: string;
	}>;
}) {
	const session = await auth();
	if (!session) {
		return redirect("/auth/login");
	}

	const sp = await searchParams;

	const res = await getExpenseList({
		offset: 0,
		limit: EXPENSE_LIST_LIMIT,
		startDate: sp.date,
		categoryId: sp.category,
	});

	let descriptionStr = "最近の記録";
	if (res.startDate && res.startDate !== res.endDate) {
		descriptionStr = `${res.startDate} - ${res.endDate}`;
	} else if (res.startDate) {
		descriptionStr = res.startDate;
	}

	const categories = await getExpenseCategoryList();

	// コンポーネントのキーに使っているがもっと良い方法があるはず
	const requestTime = new Date().getTime();

	return (
		<div>
			<PageTitle>履歴</PageTitle>
			<div className="flex flex-nowrap items-center justify-between">
				<p className="text-center text-xs">{descriptionStr}</p>
				<CategoryFilter items={categories} initialValue={sp.category} />
			</div>
			<ExpenseList
				items={res.items}
				key={requestTime}
				searchParams={{
					startDate: res.startDate,
					endDate: res.endDate,
					category: sp.category,
				}}
			/>
		</div>
	);
}
