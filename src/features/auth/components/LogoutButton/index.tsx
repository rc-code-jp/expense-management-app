"use client";

import { swal } from "@/lib/sweetalert";
import { signOut } from "next-auth/react";

export function LogoutButton() {
	const logout = async () => {
		const { isConfirmed } = await swal.confirm({
			text: "Are you sure you want to logout?",
		});
		if (isConfirmed) {
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
