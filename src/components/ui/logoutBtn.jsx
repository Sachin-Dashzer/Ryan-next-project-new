'use client';
import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  return <button onClick={() => signOut({ callbackUrl: '/login' })}>Logout</button>;
}
