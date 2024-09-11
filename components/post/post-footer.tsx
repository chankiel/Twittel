import {
  HeartIcon,
  BookmarkIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartSolidIcon,
  BookmarkIcon as BookmarkSolidIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import PostAction from "./post-action";
import { ReplyForm } from "./reply-form";
import { PostDataFormat } from "@/lib/actions";

interface PostFooterProps {
  post: PostDataFormat;
  isStatus?: boolean;
}

export default function PostFooter({
  post,
  isStatus = false,
}: PostFooterProps) {
  const liked = post.likedBy.length > 0;
  const bookmarked = post.bookmarkedBy.length > 0;
  return (
    <div className="flex h-6 mt-4">
      <div className="w-full flex items-center gap-[4px]">
        <PostAction type="reply" post_id={post.id} user_id={1}>
          <ReplyForm parent_post={post} />
        </PostAction>
        <p>{post._count.replies}</p>
      </div>
      <div className="w-full flex items-center gap-[2px]">
        <PostAction type="like" post_id={post.id} user_id={1}>
          {liked ? (
            <HeartSolidIcon className="max-h-full text-red-500" />
          ) : (
            <HeartIcon className="max-h-full hover:text-red-500 hover:bg-red-500 rounded-full hover:bg-opacity-30 hover:shadow-sm hover:shadow-red-500" />
          )}
        </PostAction>
        <p>{post._count.likedBy}</p>
      </div>
      <button className="w-full flex items-center gap-[2px]">
        <Image src={"/retweet.png"} width={24} height={24} alt="retweet" />
        <p>{post._count.bookmarkedBy}</p>
      </button>
      {!isStatus && (
        <div className="w-full h-full flex  items-center justify-end gap-1">
          <PostAction type="bookmark" post_id={post.id} user_id={1}>
            {bookmarked ? (
              <BookmarkSolidIcon className="max-h-full text-blue-600" />
            ) : (
              <BookmarkIcon className="max-h-full hover:text-blue-500 hover:bg-blue-500 rounded-full hover:bg-opacity-30 hover:shadow-sm hover:shadow-blue-500" />
            )}
          </PostAction>
          <ShareIcon className="max-h-full" />
        </div>
      )}
      {isStatus && (
        <>
          <div className="w-full h-full flex items-center gap-[2px]">
            <PostAction type="bookmark" post_id={post.id} user_id={1}>
              {bookmarked ? (
                <BookmarkSolidIcon className="max-h-full text-blue-600" />
              ) : (
                <BookmarkIcon className="max-h-full hover:text-blue-500 hover:bg-blue-500 rounded-full hover:bg-opacity-30 hover:shadow-sm hover:shadow-blue-500" />
              )}
            </PostAction>
            <p>{post._count.bookmarkedBy}</p>
          </div>
          <div className="w-full h-full flex justify-end">
            <ShareIcon className="max-h-full" />
          </div>
        </>
      )}
    </div>
  );
}
