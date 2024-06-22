import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { CategoryList } from "../features/expenses/components/CategoryList";
import { db } from "@/database/db";
import { expenseCategories } from "@/database/schema";
import { eq, asc, desc } from 'drizzle-orm';
import Link from "next/link";

export default async function Page() {
  const session = await auth()
  if (!session) {
    // not authenticated
    return redirect('/')
  }

  const userId = session.user?.id!

  const items = await db
    .select()
    .from(expenseCategories)
    .where(eq(expenseCategories.userId, userId))
    .orderBy(asc(expenseCategories.sort), desc(expenseCategories.createdAt))

  return (
    <div>
      <h1>Categories</h1>
      <CategoryList items={items}></CategoryList>
      <div>
        <Link href="/categories/create">新規登録</Link>
      </div>
    </div>
  );
}