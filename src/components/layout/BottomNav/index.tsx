"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNav() {
	const pathname = usePathname();

	const isActive = (path: string) => {
		return pathname === path ? "active" : "";
	};

	return (
		<div className="btm-nav right-auto left-auto md:w-[1024px]">
			<Link href="/report" className={isActive("/report") ? "active" : ""}>
				<span className="btm-nav-label">Report</span>
			</Link>
			<Link
				href="/items/create"
				className={isActive("/items/create") ? "active" : ""}
			>
				<span className="btm-nav-label">New</span>
			</Link>
			<Link href="/items" className={isActive("/items") ? "active" : ""}>
				<span className="btm-nav-label">History</span>
			</Link>
			<Link href="/calendar" className={isActive("/calendar") ? "active" : ""}>
				<span className="btm-nav-label">Calendar</span>
			</Link>
		</div>
	);
}
