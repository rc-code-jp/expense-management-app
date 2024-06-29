import { auth } from "@/auth";
import { PageTitle } from "@/components/layout/PageTitle";
import { db } from "@/database/db";
import { expenseCategories, type expenses } from "@/database/schema";
import { ExpenseForm } from "@/features/expenses/components/ExpenseForm";
import { dateFns, getTimezoneNow } from "@/lib/dateFns";
import { asc, desc, eq } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
	const session = await auth();
	if (!session) {
		return redirect("/auth/login");
	}

	const user = session.user;

	const categoryList = await db
		.select()
		.from(expenseCategories)
		.where(eq(expenseCategories.userId, user.id))
		.orderBy(asc(expenseCategories.sort), desc(expenseCategories.createdAt));

	const now = getTimezoneNow();
	const nowDateString = dateFns.format(now, "yyyy-MM-dd");
	const nowTimeString = dateFns.format(now, "HH:mm");

	const item: typeof expenses.$inferSelect = {
		id: "",
		amount: 0,
		categoryId: categoryList[0]?.id ?? "",
		date: nowDateString,
		time: nowTimeString,
		note: "",
		userId: "",
		createdAt: null,
		updatedAt: null,
	};

	return (
		<div>
			<PageTitle>New Item</PageTitle>
			<ExpenseForm categoryList={categoryList} item={item} />
		</div>
	);
}
