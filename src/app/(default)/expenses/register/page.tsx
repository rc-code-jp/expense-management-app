import { auth } from "@/auth";
import { PageTitle } from "@/components/layout/PageTitle";
import { db } from "@/database/db";
import { expenseCategories, type expenses } from "@/database/schema";
import { ExpenseRegisterForm } from "@/features/expenses/components/ExpenseRegisterForm";
import { dateFns } from "@/lib/dateFns";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
	const session = await auth();
	if (!session) {
		return redirect("/auth/login");
	}

	const userId = session.user?.id ?? "";

	const categoryList = await db
		.select()
		.from(expenseCategories)
		.where(eq(expenseCategories.userId, userId));

	const now = new Date();
	const nowDateString = dateFns.format(now, "yyyy-MM-dd");
	const nowTimeString = dateFns.format(now, "HH:mm");

	const item: typeof expenses.$inferSelect = {
		id: "",
		amount: 0,
		categoryId: "",
		date: nowDateString,
		time: nowTimeString,
		note: "",
		userId: "",
		createdAt: null,
		updatedAt: null,
	};

	return (
		<div>
			<PageTitle>Register</PageTitle>
			<ExpenseRegisterForm categoryList={categoryList} item={item} />
		</div>
	);
}
