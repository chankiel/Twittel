'use client';

import { FollowCards } from "@/components/follow-rec/followRec-card";
import Search from "@/components/parts/search-input";
import { SideNav } from "@/components/sidenav/side-nav";
import { TrendCards } from "@/components/trends/trend-cards";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="flex justify-center min-h-screen ">
      <SideNav username="Kiel" />
      <div className="w-[700px] border-x">
      {children}
      </div>
      {pathname!=="/explore" && <div className="px-4 lg:w-[400px] lg:items-start hidden lg:block">
        <Search placeholder="search" />
        <TrendCards />
      </div>}
      {pathname==="/explore" && <div className="px-4 lg:w-[400px] lg:items-start hidden lg:block">
        <FollowCards/>  
      </div>}
    </div>
  );
}
