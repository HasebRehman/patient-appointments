"use client";

import GuestGuard from "./(GuestGuard)/GuestGuard";

export default function AuthLayout({ children }) {
  return <GuestGuard>{children}</GuestGuard>;
}