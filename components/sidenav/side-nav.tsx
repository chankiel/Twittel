import {
  HomeIcon,
  MagnifyingGlassCircleIcon,
  BellIcon,
  EnvelopeIcon,
  BookmarkIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconSolid,
  MagnifyingGlassCircleIcon as MagnifyingGlassCircleIconSolid,
  BellIcon as BellIconSolid,
  EnvelopeIcon as EnvelopeIconSolid,
  BookmarkIcon as BookmarkIconSolid,
  UserIcon as UserIconSolid,
} from "@heroicons/react/24/solid";
import { SideIcon } from "./side-icon";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const links = [
  {
    name: "Home",
    href: "/home",
    icon: HomeIcon,
    activeIcon: HomeIconSolid
  },
  {
    name: "Explore",
    href: "/explore",
    icon: MagnifyingGlassCircleIcon,
    activeIcon: MagnifyingGlassCircleIconSolid,

  },
  {
    name: "Notifications",
    href: "/notifications",
    icon: BellIcon,
    activeIcon: BellIconSolid,
  },
  {
    name: "Messages",
    href: "/messages",
    icon: EnvelopeIcon,
    activeIcon: EnvelopeIconSolid,
  },
  {
    name: "Bookmarks",
    href: "/bookmarks",
    icon: BookmarkIcon,
    activeIcon: BookmarkIconSolid,
  },
];

export function SideNav({
  username,
}: {
  username: string;
  className?: string;
}) {
  const linkWithProfile = [
    ...links,
    {
      name: "Profile",
      href: `/${username}`,
      icon: UserIcon,
      activeIcon: UserIconSolid
    },
  ];
  return (
    <div className="flex md:flex-col px-3 md:h-screen lg:w-[250px] items-end lg:items-start fixed sm:static z-20 bottom-0 justify-around bg-white">
      <Image
        src="/twitter.png"
        width={50}
        height={50}
        alt="twitter-icon"
        className="mt-1 hidden md:block"
      />
      {linkWithProfile.map((link) => {
        return (
          <SideIcon
            key={link.name}
            name={link.name}
            href={link.href}
            Icon={<link.icon className="sm:h-[40px] sm:w-[40px] h-[30px] w-[30px]"/>}
            ActiveIcon={<link.activeIcon className="sm:h-[40px] sm:w-[40px] h-[30px] w-[30px]"/>}
          />
        );
      })}
      <div className="justify-center mt-auto mb-5 gap-2 hidden md:flex">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="hidden lg:block">
          <h1 className="font-bold">minasankonijiwa</h1>
          <h2>@ngentotko</h2>
        </div>
      </div>
    </div>
  );
}
