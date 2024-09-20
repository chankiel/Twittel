import {
  HomeIcon,
  MagnifyingGlassCircleIcon,
  BellIcon,
  BookmarkIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconSolid,
  MagnifyingGlassCircleIcon as MagnifyingGlassCircleIconSolid,
  BellIcon as BellIconSolid,
  BookmarkIcon as BookmarkIconSolid,
  UserIcon as UserIconSolid,
} from "@heroicons/react/24/solid";
import { SideIcon } from "./side-icon";
import { TwitterLogoIcon } from "@radix-ui/react-icons"
import SideProfile from "./side-profile";
import paths from "@/path";

const links = [
  {
    name: "",
    href: paths.home(),
    icon: TwitterLogoIcon,
    activeIcon: TwitterLogoIcon
  },
  {
    name: "Home",
    href: paths.home(),
    icon: HomeIcon,
    activeIcon: HomeIconSolid
  },
  {
    name: "Explore",
    href: paths.explore(),
    icon: MagnifyingGlassCircleIcon,
    activeIcon: MagnifyingGlassCircleIconSolid,

  },
  {
    name: "Notifications",
    href: paths.notifications(),
    icon: BellIcon,
    activeIcon: BellIconSolid,
  },
  {
    name: "Bookmarks",
    href: paths.bookmarks(),
    icon: BookmarkIcon,
    activeIcon: BookmarkIconSolid,
  },
  {
    name: "Profile",
    href: ``,
    icon: UserIcon,
    activeIcon: UserIconSolid
  },
];

export function SideNav() {
  return (
    <div className="flex md:flex-col px-3 md:h-screen w-full md:w-auto lg:w-[250px] items-end lg:items-start sm:sticky sm:top-0 fixed bottom-0 z-20 sm:bottom-auto justify-around bg-white sm:bg-background">
      {links.map((link) => {
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
      <SideProfile/>
    </div>
  );
}
