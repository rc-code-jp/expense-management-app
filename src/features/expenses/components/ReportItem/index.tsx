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
						<div className="stat-title text-sm">合計</div>
						<div className="stat-value text-xl">{sum.toLocaleString()}</div>
						<div className="stat-desc">{usedRate}%</div>
					</div>
				</div>
				<div className="stats w-full shadow">
					<div className="stat place-items-center">
						<div className="stat-title text-sm">残り</div>
						<div className="stat-value text-xl">{balance.toLocaleString()}</div>
						<div className="stat-desc">{100 - usedRate}%</div>
					</div>
				</div>
			</div>
		</>
	);
}
