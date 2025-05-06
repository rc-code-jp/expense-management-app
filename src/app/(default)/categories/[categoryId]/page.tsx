import { auth } from "@/auth";
import { PageTitle } from "@/components/layout/PageTitle";
import { db } from "@/database/db";
import { expenseCategories } from "@/database/schema";
import { CategoryForm } from "@/features/expenses/components/CategoryForm";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function Page({
	params,
}: {
	params: Promise<{
		categoryId: string;
	}>;
}) {
	const session = await auth();
	if (!session) {
		return redirect("/auth/login");
	}

	const p = await params;

	const isCreateMode = p.categoryId === "create";

	const user = session.user;

	let item: typeof expenseCategories.$inferSelect | undefined;

	if (!isCreateMode) {
		const res = await db
			.select()
			.from(expenseCategories)
			.where(
				and(
					eq(expenseCategories.userId, user.id),
					eq(expenseCategories.id, p.categoryId),
				),
			);
		item = res[0];
	}

	return (
		<div>
			<PageTitle>カテゴリー</PageTitle>
			<CategoryForm item={item} />
		</div>
	);
}
