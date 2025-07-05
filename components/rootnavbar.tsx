"use client";

import * as React from "react";
import { ModeToggle } from "./darkmode";
import { Button } from "./button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function RootNavbar() {
  const router = useRouter();

  return (
    <nav className="p-2 md:p-3 shadow-sm">
      <div className="container mx-auto flex flex-col md:flex-row justify-evenly items-center">
        <div className="flex flex-row items-center gap-2">
          <Image
            src="./chai-mascot.svg"
            width="30"
            height="25"
            alt={"external-N-alphabet-others-inmotus-design-14"}
          />
          <Link href="/">
            <h1 className="font-bold text-2xl">Chaireview</h1>
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <ModeToggle />
          <Button onClick={() => router.push("/sign-in")} className="rounded">
            Sign In
          </Button>
          <Button onClick={() => router.push("/dashboard")} className="rounded" variant="outline">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
}
