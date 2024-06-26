import Link from "next/link";

export function ExpenseFab() {
	return (
		<Link
			href="/expenses/create"
			className="fixed right-4 bottom-4 z-30 flex size-12 items-center justify-center overflow-hidden rounded-full bg-primary text-white text-xl shadow-xl"
		>
			+
		</Link>
	);
}
