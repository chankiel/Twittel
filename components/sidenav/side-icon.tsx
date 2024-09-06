'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

interface sideIconProps {
  name: string;
  href: string;
  Icon: React.ElementType;
  ActiveIcon: React.ElementType;
}
export function SideIcon({name,href,Icon,ActiveIcon}: sideIconProps) {
  const pathname = usePathname();

  return (
    <Link key={name} href={href} className="flex items-center h-[8%] gap-3 py-2 sm:py-0">
      {pathname!==href && <Icon className="h-[40px] w-[40px]"/>}
      {pathname===href && <ActiveIcon className="h-[40px] w-[40px]"/>}
      <p className="hidden lg:block text-xl">{name}</p>
    </Link>
  );
}
