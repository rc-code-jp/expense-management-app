export default async function Loading() {
	return (
		<>
			<h2 className="p-2 pt-0 font-bold text-lg">Monthly</h2>
			<div
				className="skeleton mt-2 h-28 w-full"
				style={{
					opacity: 0.3,
				}}
			/>
			<h2 className="p-2 pt-0 font-bold text-lg">Weekly</h2>
			<div
				className="skeleton mt-2 h-28 w-full"
				style={{
					opacity: 0.3,
				}}
			/>
			<h2 className="p-2 pt-0 font-bold text-lg">Today</h2>
			<div
				className="skeleton mt-2 h-28 w-full"
				style={{
					opacity: 0.3,
				}}
			/>
		</>
	);
}
