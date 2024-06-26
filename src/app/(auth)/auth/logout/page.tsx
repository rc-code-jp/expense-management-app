"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
	const router = useRouter();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		if (mounted) return;
		setMounted(true);
		const confirmed = confirm("Are you sure you want to sign out?");
		if (confirmed) {
			signOut()
				.then((_) => _)
				.catch((e) => e)
				.then(() => {
					router.push("/account");
				});
		} else {
			router.push("/account");
		}
	}, [router, mounted]);

	return (
		<div className="flex size-full items-center justify-center">
			<span className="loading loading-spinner loading-lg" />
		</div>
	);
}
