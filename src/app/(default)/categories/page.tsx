import { auth } from "@/auth";
import { PageTitle } from "@/components/layout/PageTitle";
import getExpenseCategoryList from "@/features/expenses/actions/getExpenseCategoryList";
import { CategoryList } from "@/features/expenses/components/CategoryList";
import {} from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
	const session = await auth();
	if (!session) {
		return redirect("/auth/login");
	}

	const items = await getExpenseCategoryList();

	return (
		<div>
			<PageTitle>カテゴリー</PageTitle>
			<div className="mt-4">
				<Link href="/categories/create" className="btn btn-block shadow-md">
					カテゴリーを追加
				</Link>
			</div>
			<CategoryList items={items} />
		</div>
	);
}
