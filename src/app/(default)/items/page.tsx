import { auth } from "@/auth";
import { PageTitle } from "@/components/layout/PageTitle";
import getExpenseList from "@/features/expenses/actions/getExpenseList";
import { ExpenseList } from "@/features/expenses/components/ExpenseList";
import { EXPENSE_LIST_LIMIT } from "@/features/expenses/utils/expenseList";
import { redirect } from "next/navigation";

export default async function Page({
	searchParams,
}: {
	searchParams: {
		date?: string;
		category?: string;
	};
}) {
	const session = await auth();
	if (!session) {
		return redirect("/auth/login");
	}

	const res = await getExpenseList({
		offset: 0,
		limit: EXPENSE_LIST_LIMIT,
		startDate: searchParams.date,
		categoryId: searchParams.category,
	});

	let descriptionStr = "Recent";
	if (res.startDate && res.startDate !== res.endDate) {
		descriptionStr = `${res.startDate} - ${res.endDate}`;
	} else if (res.startDate) {
		descriptionStr = res.startDate;
	}

	return (
		<div>
			<PageTitle>History</PageTitle>
			<div>
				<p className="text-center text-xs">{descriptionStr}</p>
			</div>
			<ExpenseList
				items={res.items}
				searchParams={{
					startDate: res.startDate,
					endDate: res.endDate,
					category: searchParams.category,
				}}
			/>
		</div>
	);
}
