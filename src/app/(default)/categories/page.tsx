import { auth } from "@/auth";
import { PageTitle } from "@/components/layout/PageTitle";
import { db } from "@/database/db";
import { expenseCategories } from "@/database/schema";
import { CategoryList } from "@/features/expenses/components/CategoryList";
import { asc, desc, eq } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
	const session = await auth();
	if (!session) {
		return redirect("/auth/login");
	}

	const userId = session.user?.id ?? "";

	const items = await db
		.select()
		.from(expenseCategories)
		.where(eq(expenseCategories.userId, userId))
		.orderBy(asc(expenseCategories.sort), desc(expenseCategories.createdAt));

	return (
		<div>
			<PageTitle>Category</PageTitle>
			<CategoryList items={items} />
		</div>
	);
}
