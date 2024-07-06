export function FormLabel({
	children,
}: {
	children: React.ReactNode;
}) {
	return <label className="font-bold text-sm">{children}</label>;
}
