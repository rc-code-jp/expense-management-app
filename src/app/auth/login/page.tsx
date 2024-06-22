"use client";

import React from "react";

import { signIn } from "next-auth/react";

export default function Page ()  {
  const handleLogin = (provider: string) => async (event: React.MouseEvent) => {
    event.preventDefault();
    await signIn(provider, {
      callbackUrl: "/",
    });
  };

  return (
    <div>
      <form>
        <button
          onClick={handleLogin("google")}
          type="button"
        >
          Googleでログイン
        </button>
      </form>
    </div>
  );
};