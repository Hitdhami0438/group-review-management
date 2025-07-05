// components/ClientRootNavbar.tsx
"use client";
import { usePathname } from "next/navigation";
import { RootNavbar } from "@/components/rootnavbar";

export function ClientRootNavbar() {
  const pathname = usePathname();
  const shouldShowRootNavbar = !pathname.startsWith("/dashboard") && !pathname.startsWith("/group") && !pathname.startsWith("/member") && !pathname.startsWith("/admin-dashboard");

  return shouldShowRootNavbar ? <RootNavbar /> : null;
}
