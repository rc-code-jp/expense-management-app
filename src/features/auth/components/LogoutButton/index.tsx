"use client";

import { signOut } from "next-auth/react";

export function LogoutButton() {
	const logout = () => {
		const confirmed = confirm("Are you sure you want to logout?");
		if (confirmed) {
			signOut({ callbackUrl: "/auth/login" });
		} else {
			// フォーカスを外す
			(document.activeElement as HTMLElement)?.blur();
		}
	};

	return (
		<button type="button" onClick={logout} className="btn btn-wide shadow-md">
			Logout
		</button>
	);
}
