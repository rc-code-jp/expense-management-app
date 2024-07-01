import { PageTitle } from "@/components/layout/PageTitle";

export default async function Loading() {
	return (
		<div>
			<PageTitle>Loading...</PageTitle>
			<div
				className="skeleton h-80 w-full"
				style={{
					opacity: 0.3,
				}}
			/>
		</div>
	);
}
