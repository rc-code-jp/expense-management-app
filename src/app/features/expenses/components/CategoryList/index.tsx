import Link from "next/link";

export function CategoryList({
  items
}: {
  items: any[]
}) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id} style={{marginTop: 10}}>
          <Link prefetch={false} href={`/categories/${item.id}`}>
            {JSON.stringify(item)}
          </Link>
        </li>
      ))}
    </ul>
  )
}