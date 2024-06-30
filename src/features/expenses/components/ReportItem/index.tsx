export function ReportItem({
	budget,
	sum,
}: {
	budget: number;
	sum: number;
}) {
	const balance = budget - sum;

	const usedRate = Math.ceil((sum / budget) * 100);

	return (
		<>
			<div className="flex flex-nowrap gap-2">
				<div className="stats w-full shadow">
					<div className="stat place-items-center">
						<div className="stat-title">Total</div>
						<div className="stat-value text-xl">{sum.toLocaleString()}</div>
						<div className="stat-desc">{usedRate}% used</div>
					</div>
				</div>
				<div className="stats w-full shadow">
					<div className="stat place-items-center">
						<div className="stat-title">Balance</div>
						<div className="stat-value text-xl">{balance.toLocaleString()}</div>
						<div className="stat-desc">{100 - usedRate}%</div>
					</div>
				</div>
			</div>
		</>
	);
}
