import { PostCards } from "@/components/post/post-cards";
import { Button } from "@/components/ui/button";
import { TabsAll } from "@/components/post/post-tabs";
import { ArrowLeftIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Profile() {
  return (
    <>
      <div className="flex items-center px-3 gap-7 py-1">
        <Link href={"/home"} className="h-6">
          <ArrowLeftIcon className="h-full" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold leading-none">UserTwitter</h1>
          <p>0 posts</p>
        </div>
      </div>
      <div className="h-[250px] bg-gray-600 relative">
        <div className="absolute h-[150px] w-[150px] rounded-full bg-blue-800 -bottom-1/4 left-3 border-4 border-white"></div>
      </div>
      <div className="p-3">
        <div className="flex justify-end">
          <Button className="rounded-full font-bold">Edit Profile</Button>
        </div>
        <h1 className="text-2xl font-bold leading-none mt-8">
          UserTwitter
        </h1>
        <p>@hehehe</p>
        <div className="flex items-center my-3">
          <CalendarDaysIcon className="h-8" />
          <p>Joined July 2024</p>
        </div>
        <div className="flex items-center gap-4">
          <p>
            <span className="font-bold text-lg">1</span> Following
          </p>
          <p>
            <span className="font-bold text-lg">0</span> Followers
          </p>
        </div>
      </div>
      <TabsAll
        tabs={[
          {
            trigger: "Posts",
            content: <PostCards uploadAble={false} />,
            value: "posts",
          },
          {
            trigger: "Replies",
            content: <PostCards uploadAble={false} />,
            value: "replies",
          },
          {
            trigger: "Media",
            content: <PostCards uploadAble={false} />,
            value: "media",
          },
          {
            trigger: "Likes",
            content: <PostCards uploadAble={false} />,
            value: "likes",
          },
        ]}
      />
    </>
  );
}
