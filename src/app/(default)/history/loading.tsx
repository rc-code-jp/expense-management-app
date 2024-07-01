import { PageTitle } from "@/components/layout/PageTitle";

export default async function Loading() {
	return (
		<div>
			<PageTitle>History</PageTitle>
			{[...Array(7)].map((_, i) => (
				<div
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					key={i}
					className="skeleton mt-4 h-20 w-full"
					style={{
						opacity: 0.3,
					}}
				/>
			))}
		</div>
	);
}
