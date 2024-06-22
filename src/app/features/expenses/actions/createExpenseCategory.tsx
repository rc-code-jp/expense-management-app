import { auth } from "@/auth";
import { db } from "@/database/db";
import { expenseCategories } from "@/database/schema";

export const createExpenseCategory = async (data: FormData) => {
  'use server';
  const body = {
    name: data.get('name') as string,
    color: data.get('color') as string,
  };

  const session = await auth()
  const userId = session?.user?.id!

  await db.insert(expenseCategories).values({ 
    userId: userId, 
    name: body.name,
    color: body.color,
    sort: 0
  })
}