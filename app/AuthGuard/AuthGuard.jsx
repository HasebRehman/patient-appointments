"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }) {

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const publicRoutes = ["/login", "/signup", "/otp"];

    if (!token && !publicRoutes.includes(pathname)) {
      router.replace("/login");
    }

  }, [pathname, router]);

  return children;
}