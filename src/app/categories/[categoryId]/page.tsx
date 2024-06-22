import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { CategoryForm } from "../../features/expenses/components/CategoryForm";
import Link from "next/link";
import { expenseCategories } from "@/database/schema";
import { and, eq } from "drizzle-orm";
import { db } from "@/database/db";

export default async function Page({
  params
}: {
  params: {
    categoryId: string;
  }
}) {
  const session = await auth()
  if (!session) {
    // not authenticated
    return redirect('/')
  }

  const isCreateMode = params.categoryId === 'create';

  const userId = session.user?.id!

  let item = null
  if (!isCreateMode) {
    const res = await db.select().from(expenseCategories).where(
      and(
        eq(expenseCategories.userId, userId),
        eq(expenseCategories.id, params.categoryId)
      )
    )
    item = res[0]
  }

  return (
    <div>
      <h1>Categories</h1>
      <CategoryForm item={item}></CategoryForm>
      <div>
        <Link href="/categories">戻る</Link>
      </div>
    </div>
  );
}