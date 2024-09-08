
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ChatBubbleLeftIcon,
  HeartIcon,
  BookmarkIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { PostOptions } from "./post-option";

interface PostCard {}

export function PostCard() {
  return (
    <div className="flex p-3 border-b relative">
      <PostOptions className="absolute right-4" />
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="ml-3 w-full">
        <h3 className="font-bold text-lg">
          Faze Jason <span>@jasontheween . 3j</span>
        </h3>
        <p className="mb-2">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia
          placeat totam maxime cum! Aliquam blanditiis atque vel similique
          soluta quas molestiae quia fugit dolorem sit rerum voluptate, rem
          molestias aut!
        </p>
        <Image
          src={"/imagepost-1.png"}
          width={300}
          height={300}
          alt="image-post"
        />
        <div className="flex h-6 mt-4">
          <div className="w-full h-full flex items-center gap-[2px]">
            <ChatBubbleLeftIcon className="max-h-full" />
            <p>41</p>
          </div>
          <div className="w-full h-full flex items-center gap-[2px]">
            <HeartIcon className="max-h-full" />
            <p>2 rb</p>
          </div>
          <div className="w-full h-full flex items-center gap-[2px]">
            <Image src={"/retweet.png"} width={24} height={24} alt="retweet" />
            <p>2 rb</p>
          </div>
          <div className="w-full h-full flex  items-center justify-end gap-1">
            <BookmarkIcon className="max-h-full" />
            <ShareIcon className="max-h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function PostStatusCard() {
  return (
    <>
      <div className="flex p-3 relative">
        <PostOptions className="absolute right-4" />
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="ml-3 w-full">
          <h3 className="font-bold text-lg leading-none">Faze Jason</h3>
          <p>@jasontheween</p>
        </div>
      </div>
      <div className="px-4">
        <p className="mb-2 font-medium">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia
          placeat totam maxime cum! Aliquam blanditiis atque vel similique soluta
          quas molestiae quia fugit dolorem sit rerum voluptate, rem molestias
          aut!
        </p>
        <div className="flex justify-center">
          <Image
            src={"/imagepost-1.png"}
            width={300}
            height={300}
            alt="image-post"
            className="w-[90%]"
          />
          </div>
        <p className="my-3">4:59 AM . Sep 8, 2024 . <span className="font-bold">1,8M</span> Views</p>
        <hr />
        <div className="flex h-6 my-4">
          <div className="w-full h-full flex items-center gap-[2px]">
            <ChatBubbleLeftIcon className="max-h-full" />
            <p>41</p>
          </div>
          <div className="w-full h-full flex items-center gap-[2px]">
            <HeartIcon className="max-h-full" />
            <p>2 rb</p>
          </div>
          <div className="w-full h-full flex items-center gap-[2px]">
            <Image src={"/retweet.png"} width={24} height={24} alt="retweet" />
            <p>2 rb</p>
          </div>
          <div className="w-full h-full flex items-center gap-[2px]">
            <BookmarkIcon className="max-h-full" />
            <p>2 rb</p>
          </div>
          <div className="w-full h-full flex justify-end">
            <ShareIcon className="max-h-full" />
          </div>
        </div>
        <hr />
        </div>
    </>
  );
}
