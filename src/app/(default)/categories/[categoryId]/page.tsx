import { auth } from "@/auth";
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

	const userId = session.user?.id ?? "";

	let item: typeof expenseCategories.$inferSelect | undefined;

	if (!isCreateMode) {
		const res = await db
			.select()
			.from(expenseCategories)
			.where(
				and(
					eq(expenseCategories.userId, userId),
					eq(expenseCategories.id, params.categoryId),
				),
			);
		item = res[0];
	}

	return (
		<div>
			<h1>Categories</h1>
			<CategoryForm item={item} />
			<div>
				<Link href="/categories">戻る</Link>
			</div>
		</div>
	);
}
