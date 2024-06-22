import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ExpenseList } from "../features/expenses/components/ExpenseList";
import { db } from "@/database/db";
import { expenses } from "@/database/schema";
import { eq } from 'drizzle-orm';

export default async function Page() {
  const session = await auth()
  if (!session) {
    // not authenticated
    return redirect('/')
  }

  const userId = session.user?.id!

  const items = await db.select().from(expenses).where(eq(expenses.userId, userId))

  return (
    <div>
      <h1>History</h1>
      <ExpenseList items={items}></ExpenseList>
    </div>
  );
}