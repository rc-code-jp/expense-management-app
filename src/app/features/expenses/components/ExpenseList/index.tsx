import Link from "next/link";

export function ExpenseList({
  items
}: {
  items: any[]
}) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.expenses.id} style={{marginTop: 10}}>
          <Link prefetch={false} href={`/histories/${item.expenses.id}`}>
            {JSON.stringify(item)}
          </Link>
        </li>
      ))}
    </ul>
  )
}