'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

interface sideIconProps {
  name: string;
  href: string;
  Icon: React.ReactNode;
  ActiveIcon: React.ReactNode;
}
export function SideIcon({name,href,Icon,ActiveIcon}: sideIconProps) {
  const pathname = usePathname();

  return (
    <Link key={name} href={href} className={`flex items-center gap-3 py-2 sm:my-2 rounded-full hover:bg-gray-200 px-4 ${name==="" ? "hidden md:block":""}`}>
      {pathname!==href && Icon}
      {pathname===href && ActiveIcon}
      <p className={`hidden lg:block text-xl ${pathname===href ? "font-bold":""}`}>{name}</p>
    </Link>
  );
}
