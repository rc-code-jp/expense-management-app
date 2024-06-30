import { auth } from "@/auth";
import { PageTitle } from "@/components/layout/PageTitle";
import { db } from "@/database/db";
import { expenseCategories } from "@/database/schema";
import { CategoryForm } from "@/features/expenses/components/CategoryForm";
import { and, eq } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page({
	params,
}: {
	params: {
		categoryId: string;
	};
}) {
	const session = await auth();
	if (!session) {
		return redirect("/auth/login");
	}

	const isCreateMode = params.categoryId === "create";

	const user = session.user;

	let item: typeof expenseCategories.$inferSelect | undefined;

	if (!isCreateMode) {
		const res = await db
			.select()
			.from(expenseCategories)
			.where(
				and(
					eq(expenseCategories.userId, user.id),
					eq(expenseCategories.id, params.categoryId),
				),
			);
		item = res[0];
	}

	return (
		<div>
			<PageTitle>Category</PageTitle>
			<CategoryForm item={item} />
		</div>
	);
}
