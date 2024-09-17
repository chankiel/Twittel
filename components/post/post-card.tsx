import { PostOptions } from "./post-option";
import { fetchPost, type PostDataFormat } from "@/lib/actions";
import Link from "next/link";
import PostFooter from "./post-footer";
import { diffNow, formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { PostInput } from "./post-input";
import UserAvatar from "../parts/user-avatar";

export function PostCardSkeleton() {
  return (
    <div className="flex space-x-2 p-3 border-b">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2 flex-grow">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-1/6" />
        <Skeleton className="h-20 my-1 w-full" />
      </div>
    </div>
  );
}

export function PostCardSkeletons({
  uploadAble = false,
  placeholder = "What's happening!?",
}: {
  uploadAble?: boolean;
  placeholder?: string;
}) {
  return (
    <>
      {uploadAble && <PostInput placeholder={placeholder} />}
      {Array.from({ length: 4 }).map((_, index) => (
        <PostCardSkeleton key={index} />
      ))}
    </>
  );
}

export async function PostCard({
  post,
  isParentPost = false,
  isReplySeq = false,
}: {
  post: PostDataFormat;
  isParentPost?: boolean;
  isReplySeq?: boolean;
}) {
  const diffTimeString = diffNow(post.datetime_post);
  const parentPost_author = post.parentPost?.author.addname;
  let parent_post: PostDataFormat | null = null;
  if (isReplySeq && post.parent_id) {
    parent_post = await fetchPost({
      where: {
        id: post.parent_id,
      },
    });
  }

  return (
    <div className={`${isReplySeq || !isParentPost ? "border-b py-3" : ""}`}>
      {isReplySeq && parent_post && (
        <PostCard post={parent_post} isParentPost={true} />
      )}
      <div className={`flex px-3 relative`}>
        <PostOptions className="absolute right-4" post_id={post.id} />
        <Link href={`/${post.author.addname}`} className="flex flex-col items-center">
          <UserAvatar src={post.author.image}/>
          {isParentPost && (
            <Image
              src={"/vert-line.png"}
              alt="vert-line"
              width={10}
              height={150}
              className="h-full"
            />
          )}
        </Link>
        <div className="ml-3 w-full">
          <Link href={`/${post.author.addname}`}>
            <h3 className="font-bold text-lg leading-none">
              {post.author.username}{" "}
              <span>
                @{post.author.addname} · {diffTimeString}
              </span>
            </h3>
          </Link>
            {parentPost_author && (
              <h4 className="text-slate-500">
                Membalas{" "}
                <Link href={`/${parentPost_author}`} className="text-blue-400">@{parentPost_author}</Link>
              </h4>
            )}
          <Link href={`/${post.author.addname}/status/${post.id}`}>
            <p className="mt-1">{post.content}</p>
          </Link>
          {/* <Image
          src={"/imagepost-1.png"}
          width={300}
          height={300}
          alt="image-post"
        /> */}
          <PostFooter post={post} isParentStatus={isParentPost} />
        </div>
      </div>
    </div>
  );
}

export async function PostParentCard({ post_id }: { post_id: number }) {
  const parentArr: PostDataFormat[] = [];
  let currentId: number | null | undefined = post_id;
  while (currentId !== null) {
    const postData = await fetchPost({
      where: {
        id: currentId,
      },
    });
    if (postData) {
      parentArr.push(postData);
    }
    currentId = postData?.parent_id;
  }
  return (
    <div>
      {[...parentArr].reverse().map((post) => {
        return <PostCard post={post} key={post.id} isParentPost={true} />;
      })}
    </div>
  );
}

export async function PostStatusCard({
  post_id,
  addname,
}: {
  post_id: number;
  addname: string;
}) {
  const post = await fetchPost({
    where: {
      id: Number(post_id),
      author: {
        addname: addname,
      },
    },
  });

  if (!post) {
    notFound();
  }
  const stringDate = formatDate(post.datetime_post);
  return (
    <>
      {post.parent_id && <PostParentCard post_id={post.parent_id} />}
      <div className="flex px-3 relative">
        <PostOptions className="absolute right-4" post_id={post.id} />
        <UserAvatar src={post.author.image}></UserAvatar>
        <div className="ml-3 w-full">
          <h3 className="font-bold text-lg leading-none">
            {post.author.username}
          </h3>
          <p>@{post.author.addname}</p>
        </div>
      </div>
      <div className="px-4">
        <p className=" my-2 font-medium">{post.content}</p>
        <p className="my-3">
          {stringDate}. <span className="font-bold">1,8M</span> Views
        </p>
        <hr />
        <PostFooter post={post ?? {}} isStatus={true}></PostFooter>
        <hr className="mt-4" />
      </div>
    </>
  );
}
