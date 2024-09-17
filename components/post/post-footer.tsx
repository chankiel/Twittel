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
import {auth} from "@/auth"
import { notFound } from "next/navigation";
interface PostFooterProps {
  post: PostDataFormat;
  isStatus?: boolean;
  isParentStatus?: boolean;
}

export default async function PostFooter({
  post,
  isStatus = false,
  isParentStatus = false,
}: PostFooterProps) {
  const session = await auth();
  if(!session?.user){
    notFound();
  }
  const userId = session.user.id;
  const liked = post.likedBy.length > 0;
  const bookmarked = post.bookmarkedBy.length > 0;
  return (
    // flex h-6 mt-4
    <div className={`flex h-6 mt-2 ${isParentStatus && "mb-5"}`}>
      <div className="flex-grow flex items-center gap-[4px]">
        <PostAction type="reply" post_id={post.id} user_id={userId}>
          <ReplyForm parent_post={post} />
        </PostAction>
        <p>{post._count.replies}</p>
      </div>
      <div className="flex-grow flex items-center gap-[2px]">
        <PostAction type="like" post_id={post.id} user_id={userId}>
          {liked ? (
            <HeartSolidIcon className="max-h-full text-red-500" />
          ) : (
            <HeartIcon className="max-h-full hover:text-red-500 hover:bg-red-500 rounded-full hover:bg-opacity-30 hover:shadow-sm hover:shadow-red-500" />
          )}
        </PostAction>
        <p>{post._count.likedBy}</p>
      </div>
      <button className="flex-grow flex items-center gap-[2px]">
        <Image src={"/retweet.png"} width={24} height={24} alt="retweet" />
        <p>{0}</p>
      </button>

      {isStatus ? (
        <>
          <div className="flex-grow h-full flex items-center gap-[2px]">
            <PostAction type="bookmark" post_id={post.id} user_id={userId}>
              {bookmarked ? (
                <BookmarkSolidIcon className="max-h-full text-blue-600" />
              ) : (
                <BookmarkIcon className="max-h-full hover:text-blue-500 hover:bg-blue-500 rounded-full hover:bg-opacity-30 hover:shadow-sm hover:shadow-blue-500" />
              )}
            </PostAction>
            <p>{post._count.bookmarkedBy}</p>
          </div>
          <div className="h-full flex justify-end">
            <ShareIcon className="max-h-full" />
          </div>
        </>
      ) : (
        <div className="h-full flex items-center justify-end gap-1">
          <PostAction type="bookmark" post_id={post.id} user_id={userId}>
            {bookmarked ? (
              <BookmarkSolidIcon className="h-full text-blue-600" />
            ) : (
              <BookmarkIcon className="h-full hover:text-blue-500 hover:bg-blue-500 rounded-full hover:bg-opacity-30 hover:shadow-sm hover:shadow-blue-500" />
            )}
          </PostAction>
          <ShareIcon className="h-full" />
        </div>
      )}
    </div>
  );
}
