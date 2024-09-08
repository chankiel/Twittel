import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { PostStatusCard } from "@/components/post/post-card";
import { PostCards } from "@/components/post/post-cards";

export default function Post() {
  return (
    <div>
      <div className="flex items-center px-3 gap-7 py-4">
        <Link href={"/home"} className="h-6">
          <ArrowLeftIcon className="h-full" />
        </Link>
        <div>
        <h1 className="text-2xl font-bold">Post</h1>        </div>
      </div>
      <PostStatusCard/>
      <PostCards uploadAble={true} placeholder="Post your reply"/>
    </div>
  );
}
