"use client";

import { cn } from "@/lib/utils";
import { TrendCard } from "./trend-card";
import Link from "next/link";
import Search from "../parts/search-input";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

export function TrendCards({
  className,
  sideTrend,
}: {
  className?: string;
  sideTrend: boolean;
}) {
  const pathname = usePathname();
  return (
    <>
      {!(sideTrend && pathname === "/explore") && (
        <Suspense>
          <Search placeholder="Search"></Search>
          <div
            className={cn("border", "mt-3", "p-3", " rounded-xl", className)}
          >
            <h1 className="text-xl font-bold">Trends For You</h1>
            <TrendCard />
            <TrendCard />
            <TrendCard />
            <TrendCard />
            <Link className="text-blue-400" href={"/explore"}>
              Show more
            </Link>
          </div>
        </Suspense>
      )}
    </>
  );
}
