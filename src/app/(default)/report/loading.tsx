export default async function Loading() {
	return (
		<>
			<h2 className="p-2 pt-0 font-bold text-lg">Monthly</h2>
			<div
				className="skeleton h-28 w-full"
				style={{
					opacity: 0.3,
				}}
			/>
			<h2 className="mt-2 p-2 font-bold text-lg">Weekly</h2>
			<div
				className="skeleton h-28 w-full"
				style={{
					opacity: 0.3,
				}}
			/>
			<h2 className="mt-2 p-2 font-bold text-lg">Today</h2>
			<div
				className="skeleton h-28 w-full"
				style={{
					opacity: 0.3,
				}}
			/>
		</>
	);
}
