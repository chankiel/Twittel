import { cn } from "@/lib/utils";
import { TrendCard } from "./trend-card";
import Link from "next/link";

export function TrendCards({ className }: { className?: string }) {
  return (
    <div className={cn("border", "mt-3", "p-3", " rounded-xl", className)}>
      <h1 className="text-xl font-bold">Trends For You</h1>
      <TrendCard />
      <TrendCard />
      <TrendCard />
      <TrendCard />
      <Link className="text-blue-400" href={"/explore"}>
        Show more
      </Link>
    </div>
  );
}
