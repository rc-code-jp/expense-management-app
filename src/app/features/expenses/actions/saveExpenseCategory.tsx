import { auth } from "@/auth";
import { db } from "@/database/db";
import { expenseCategories } from "@/database/schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export const saveExpenseCategory = async (data: FormData) => {
  'use server';
  const body = {
    id: data.get('id') as string,
    name: data.get('name') as string,
    color: data.get('color') as string,
  };

  const session = await auth()
  const userId = session?.user?.id!

  if (body.id) {
    await db.update(expenseCategories).set({
      name: body.name,
      color: body.color,
      sort: 0
    }).where(
      and(
        eq(expenseCategories.userId, userId ),
        eq(expenseCategories.id, body.id)
      )
    )
  } else {
    await db.insert(expenseCategories).values({ 
      userId: userId, 
      name: body.name,
      color: body.color,
      sort: 0
    })
  }

  redirect('/categories')
}