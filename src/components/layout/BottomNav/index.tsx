"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNav() {
	const pathname = usePathname();

	const isActive = (path: string) => {
		return pathname === path ? "active" : "";
	};

	return (
		<div className="btm-nav md-width right-auto left-auto box-content h-12 bg-neutral pb-safe text-neutral-content">
			<Link href="/report" className={isActive("/report") ? "bg-primary" : ""}>
				<span className="btm-nav-label">Report</span>
			</Link>
			<Link
				href="/items/create"
				className={isActive("/items/create") ? "bg-primary" : ""}
			>
				<span className="btm-nav-label">New</span>
			</Link>
			<Link href="/items" className={isActive("/items") ? "bg-primary" : ""}>
				<span className="btm-nav-label">History</span>
			</Link>
			<Link
				href="/calendar"
				className={isActive("/calendar") ? "bg-primary" : ""}
			>
				<span className="btm-nav-label">Calendar</span>
			</Link>
		</div>
	);
}
