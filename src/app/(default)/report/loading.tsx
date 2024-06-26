export default async function Loading() {
	return (
		<>
			{[...Array(3)].map((_, i) => (
				<div
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					key={i}
					className="skeleton mt-4 h-24 w-full"
					style={{
						opacity: 0.3,
					}}
				/>
			))}
		</>
	);
}
