'use client';
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      style={{
        padding: "0.5rem 1rem",
        background: "#d9534f",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer"
      }}
    >
      Logout
    </button>
  );
}
