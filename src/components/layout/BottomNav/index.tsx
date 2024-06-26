"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNav() {
	const pathname = usePathname();

	const isActive = (path: string, isInclude = false) => {
		if (isInclude) {
			return pathname.includes(path) ? "active" : "";
		}
		return pathname === path ? "active" : "";
	};

	return (
		<div className="btm-nav">
			<Link
				href="/report"
				className={isActive("/report", true) ? "active" : ""}
			>
				<span className="btm-nav-label">Report</span>
			</Link>
			<Link href="/expenses" className={isActive("/expenses") ? "active" : ""}>
				<span className="btm-nav-label">History</span>
			</Link>
			<Link
				href="/expenses/create"
				className={isActive("/expenses/create") ? "active" : ""}
			>
				<span className="btm-nav-label">New</span>
			</Link>
			<Link
				href="/calendar"
				className={isActive("/calendar", true) ? "active" : ""}
			>
				<span className="btm-nav-label">Calendar</span>
			</Link>
		</div>
	);
}
