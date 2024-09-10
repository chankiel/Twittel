import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ChatBubbleLeftIcon,
  HeartIcon,
  BookmarkIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import {
  ChatBubbleLeftIcon as ChatBubbleLeftSolidIcon,
  HeartIcon as HeartSolidIcon,
  BookmarkIcon as BookmarkSolidIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { PostOptions } from "./post-option";
import PostAction from "./post-action";
import type { PostDataFormat } from "@/lib/actions";

export function PostCard({ post, liked, bookmarked }: { post: PostDataFormat, liked:boolean, bookmarked:boolean }) {
  const now = new Date();
  let timeType = "s";
  let diffTime = Math.floor(
    (now.getTime() - post.datetime_post.getTime()) / 1000
  );
  if (diffTime > 3600) {
    diffTime = Math.floor(diffTime / 3600);
    timeType = "j";
  } else if (diffTime > 60) {
    diffTime = Math.floor(diffTime / 60);
    timeType = "m";
  } else if (diffTime == 0) {
    timeType = "now";
  }
  return (
    <div className="flex p-3 border-b relative">
      <PostOptions className="absolute right-4" post_id={post.id} />
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="ml-3 w-full">
        <h3 className="font-bold text-lg">
          {post.author.username}{" "}
          <span>
            @{post.author.addname} . {timeType === "now" ? "" : diffTime}
            {timeType}
          </span>
        </h3>
        <p className="mb-2">{post.content}</p>
        {/* <Image
          src={"/imagepost-1.png"}
          width={300}
          height={300}
          alt="image-post"
        /> */}
        <div className="flex h-6 mt-4">
          <div className="w-full flex items-center gap-[4px]">
            <PostAction type="like" post_id={post.id} user_id={1}>
              <ChatBubbleLeftIcon className="max-h-full" />
            </PostAction>
            <p>{post._count.replies}</p>
          </div>
          <div className="w-full flex items-center gap-[2px]">
            <PostAction type="like" post_id={post.id} user_id={1}>
              {liked ?  <HeartSolidIcon className="max-h-full" />:<HeartIcon className="max-h-full" />}
            </PostAction>
            <p>{post._count.likedBy}</p>
          </div>
          <button className="w-full h-full flex items-center gap-[2px]">
            <Image src={"/retweet.png"} width={24} height={24} alt="retweet" />
            <p>{post._count.bookmarkedBy}</p>
          </button>
          <div className="w-full h-full flex  items-center justify-end gap-1">
            <PostAction type="bookmark" post_id={post.id} user_id={1}>
            {bookmarked ? <BookmarkSolidIcon className="max-h-full" />:<BookmarkIcon className="max-h-full" />}
            </PostAction>
            <ShareIcon className="max-h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function PostStatusCard({ post }: { post: PostDataFormat }) {
  return (
    <>
      <div className="flex p-3 relative">
        <PostOptions className="absolute right-4" post_id={post.id} />
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="ml-3 w-full">
          <h3 className="font-bold text-lg leading-none">
            {post.author.username}
          </h3>
          <p>@{post.author.addname}</p>
        </div>
      </div>
      <div className="px-4">
        <p className="mb-2 font-medium">{post.content}</p>
        {/* <div className="flex justify-center">
          <Image
            src={"/imagepost-1.png"}
            width={300}
            height={300}
            alt="image-post"
            className="w-[90%]"
          />
        </div> */}
        <p className="my-3">
          4:59 AM . Sep 8, 2024 . <span className="font-bold">1,8M</span> Views
        </p>
        <hr />
        <div className="flex h-6 my-4">
          <div className="w-full h-full flex items-center gap-[2px]">
            <ChatBubbleLeftIcon className="max-h-full" />
            <p>{post._count.replies}</p>
          </div>
          <div className="w-full h-full flex items-center gap-[2px]">
            <HeartIcon className="max-h-full" />
            <p>{post._count.likedBy}</p>
          </div>
          <div className="w-full h-full flex items-center gap-[2px]">
            <Image src={"/retweet.png"} width={24} height={24} alt="retweet" />
            <p>2 rb</p>
          </div>
          <div className="w-full h-full flex items-center gap-[2px]">
            <BookmarkIcon className="max-h-full" />
            <p>{post._count.bookmarkedBy}</p>
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
