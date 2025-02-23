import Link from "next/link";

import { HydrateClient } from "@/lib/trpc/server";
export const HomePage = async () => {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <Link
            href={"/dashboard"}
            className="text-5xl font-extrabold tracking-tight sm:text-[5rem]"
          >
            Create Dashboard{" "}
            <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </Link>
        </div>
      </main>
    </HydrateClient>
  );
};
