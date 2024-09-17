"use client";

import { useSession } from "next-auth/react";
import UserAvatar from "../parts/user-avatar";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Image from "next/image";
import { signOut } from "@/lib/actions";

export default function SideProfile() {
  const { data: session } = useSession();
  const [user, setUser] = useState({ username: "", addname: "", image: "" });

  useEffect(() => {
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
        setUser(userData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [session?.user]);

  console.log(user.image);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full items-center justify-center mt-auto mb-5 gap-2 hidden md:flex rounded-full hover:bg-gray-200 px-2">
        <UserAvatar fallback="CN" src={user.image}></UserAvatar>
        <div className="hidden lg:block">
          <h1 className="font-bold">{user.username}</h1>
          <h2>@{user.addname}</h2>
        </div>
        <Image
          src={"/option.png"}
          width={20}
          height={20}
          alt="post-option"
          className="ml-auto"
        ></Image>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-2xl">
        <DropdownMenuItem>
          <form action={signOut}>
            <button className="font-bold my-2" type="submit">
              Keluar dari @{user.addname}?
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
