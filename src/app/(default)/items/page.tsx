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
	};
}) {
	const session = await auth();
	if (!session) {
		return redirect("/auth/login");
	}

	const res = await getExpenseList({
		offset: 0,
		limit: EXPENSE_LIST_LIMIT,
		date: searchParams.date,
	});

	return (
		<div>
			<PageTitle>History</PageTitle>
			<div>
				<p className="text-center text-xs">{res.date || "Recent"}</p>
			</div>
			<ExpenseList items={res.items} />
		</div>
	);
}
