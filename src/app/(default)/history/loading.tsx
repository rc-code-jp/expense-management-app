export default async function Loading() {
	return (
		<>
			{[...Array(5)].map((_, i) => (
				<div
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					key={i}
					className="skeleton mt-4 h-20 w-full"
					style={{
						opacity: 0.3,
					}}
				/>
			))}
		</>
	);
}
