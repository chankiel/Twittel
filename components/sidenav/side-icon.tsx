"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface sideIconProps {
  name: string;
  href: string;
  Icon: React.ReactNode;
  ActiveIcon: React.ReactNode;
}

export function SideIcon({ name, href, Icon, ActiveIcon }: sideIconProps) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [validHref, setValidHref] = useState<string>(href);

  useEffect(() => {
    if (name === "Profile") {
      const fetchUser = async () => {
        try {
          if (!session?.user) {
            throw new Error("Not profile icon");
          }
          const res = await fetch(`/api/users/${session.user.id}`);
          if (!res.ok) {
            const errorMsg = await res.text();
            throw new Error(errorMsg);
          }
          const userData = await res.json();
          setValidHref(`/${userData.addname}`);
        } catch (error) {
          console.log(error);
        }
      };
      fetchUser();
    }
  }, [name, session?.user]);

  return (
    <>
      {status === "authenticated" && (
        <Link
          key={name}
          href={validHref}
          className={`flex items-center gap-3 py-2 sm:my-2 rounded-full hover:bg-gray-200 px-4 ${
            name === "" ? "hidden md:block" : ""
          }`}
        >
          {pathname !== validHref && Icon}
          {pathname === validHref && ActiveIcon}
          <p
            className={`hidden lg:block text-xl ${
              pathname === href ? "font-bold" : ""
            }`}
          >
            {name}
          </p>
        </Link>
      )}
    </>
  );
}
