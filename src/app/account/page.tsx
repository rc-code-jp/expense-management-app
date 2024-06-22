"use client";

import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session, status } = useSession()
  
  return (
    <div>
      <h1>Account</h1>
      <p>
        {JSON.stringify(session, null, 2)}
      </p>
    </div>
  );
}