"use client";

import { Button } from "@/components/button";
import DisplayCards from "@/components/displaycard";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  return (
    <main className="flex-1">
      <div className="flex h-screen flex-col overflow-x-hidden px-8">
        <section className=" mt-30 flex items-center justify-center max-xl:flex-col xl:mt-25">
          <div className="flex-1">
            <h1 className="font-montserrat font-semibold text-justify text-4xl tracking-tight inline-block sm:text-5xl md:text-6xl">
              This platefor Only
            </h1>
            <h1 className="font-montserrat font-semibold text-justify text-4xl tracking-tight sm:text-5xl md:text-6xl">
              Made for{" "}
              <span className="text-accent-400 text-orange-300">Chaicode</span>{" "}
              student
            </h1>

            <p className="ml-1 mt-5 text-left text-default-500 md:text-xl inline-block">
              Learn and grow with chaicode
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4 md:mt-10">
              <Button onClick={() => router.push("/dashboard")} className="rounded dark:bg-amber-200">
                Start your journey
              </Button>
            </div>
          </div>

          <div className="mr-[120px] mt-[10]">
            <DisplayCards />
          </div>
        </section>
      </div>
    </main>
  );
}
