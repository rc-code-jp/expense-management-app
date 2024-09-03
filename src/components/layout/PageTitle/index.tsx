export function PageTitle({ children }: { children: React.ReactNode }) {
	return (
		<h1 className="mb-2 flex items-center justify-center font-bold text-2xl text-gray-900">
			{children}
		</h1>
	);
}
