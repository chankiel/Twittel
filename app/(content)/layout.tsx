import { FollowCards } from "@/components/follow-rec/followRec-card";
import { SideNav } from "@/components/sidenav/side-nav";
import { TrendCards } from "@/components/trends/trend-cards";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center min-h-screen ">
      <SideNav />
      <div className="w-[700px] border-x">{children}</div>
      <div className="px-4 lg:w-[400px] lg:items-start hidden lg:block sticky top-0 h-screen">
        <TrendCards sideTrend={true} />
        <FollowCards />
      </div>
    </div>
  );
}
