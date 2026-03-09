"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function GuestGuard({ children }) {

  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.replace("/"); 
    } else {
      setChecking(false);
    }

  }, [router]);

  if (checking) return null;

  return children;
}