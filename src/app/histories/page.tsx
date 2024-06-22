import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ExpenseList } from "../features/expenses/components/ExpenseList";
import { db } from "@/database/db";
import { expenseCategories, expenses } from "@/database/schema";
import { desc, eq } from 'drizzle-orm';
import Link from "next/link";

export default async function Page() {
  const session = await auth()
  if (!session) {
    // not authenticated
    return redirect('/')
  }

  const userId = session.user?.id!

  const items: any[] = await db
    .select()
    .from(expenses)
    .where(eq(expenses.userId, userId))
    .innerJoin(expenseCategories, eq(expenses.categoryId, expenseCategories.id))
    .orderBy(desc(expenses.date), desc(expenses.time))

  return (
    <div>
      <h1>History</h1>
      <ExpenseList items={items}></ExpenseList>
      <div>
        <Link href="/register">登録</Link>
      </div>
    </div>
  );
}