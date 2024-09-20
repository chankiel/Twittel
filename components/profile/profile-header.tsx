"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

interface ProfileHeaderProps {
  username: string;
  postsCount: number;
}

export default function ProfileHeader({
  username,
  postsCount,
}: ProfileHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex items-center px-3 gap-7 py-1">
      <button
        className="h-6"
        onClick={() => {
          router.back();
        }}
      >
        <ArrowLeftIcon className="h-full" />
      </button>
      <div>
        <h1 className="text-2xl font-bold leading-none">{username}</h1>
        <p>{postsCount} posts</p>
      </div>
    </div>
  );
}
