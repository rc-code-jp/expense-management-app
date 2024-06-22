import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/database/db";
import { expenses } from "@/database/schema";
import { and, eq } from 'drizzle-orm';

export default async function Page({
  params
}: {
  params: {
    expenseId: string;
  }
}) {
  const session = await auth()
  if (!session) {
    // not authenticated
    return redirect('/')
  }

  const userId = session.user?.id!

  const item = await db.select().from(expenses).where(
    and(
      eq(expenses.userId, userId),
      eq(expenses.id, params.expenseId)
    )
  )

  return (
    <div>
      <h1>History</h1>
      <div>
        {JSON.stringify(item)}
      </div>
    </div>
  );
}