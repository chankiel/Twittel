import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PostOptions } from "./post-option";
import { fetchPost, type PostDataFormat } from "@/lib/actions";
import Link from "next/link";
import PostFooter from "./post-footer";
import { diffNow } from "@/lib/utils";
import { notFound } from "next/navigation";
import Image from "next/image";

export function PostCard({
  post,
  showBorder = true,
  showVertLine = false,
}: {
  post: PostDataFormat;
  showBorder?: boolean;
  showVertLine?: boolean;
}) {
  const diffTimeString = diffNow(post.datetime_post);
  const parentPost_author = post.parentPost?.author.addname;
  return (
    <div className={`flex p-3 ${showBorder ? "border-b" : ""} relative`}>
      <PostOptions className="absolute right-4" post_id={post.id} />
      <div className="flex flex-col items-center">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {showVertLine && (
          <Image
            src={"/vert-line.png"}
            alt="vert-line"
            width={10}
            height={150}
            className="h-full"
          />
        )}
      </div>
      <div className="ml-3 w-full">
        <Link href={`/${post.author.addname}/status/${post.id}`}>
          <h3 className="font-bold text-lg leading-none">
            {post.author.username}{" "}
            <span>
              @{post.author.addname} . {diffTimeString}
            </span>
          </h3>
          {parentPost_author && (
            <h4 className="text-slate-500">
              Membalas{" "}
              <span className="text-blue-400">@{parentPost_author}</span>
            </h4>
          )}
          <p className="mt-1">{post.content}</p>
        </Link>
        {/* <Image
          src={"/imagepost-1.png"}
          width={300}
          height={300}
          alt="image-post"
        /> */}
        <PostFooter post={post} />
      </div>
    </div>
  );
}

export async function PostParentCard({ post_id }: { post_id: number }) {
  const parentArr: PostDataFormat[] = [];
  let currentId: number | null | undefined = post_id;
  console.log(currentId);
  while (currentId !== null) {
    console.log(currentId);
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
        return (
          <PostCard
            post={post}
            key={post.id}
            showBorder={false}
            showVertLine={true}
          />
        );
      })}
    </div>
  );
}

export async function PostStatusCard({ post_id }: { post_id: number }) {
  const post = await fetchPost({
    where: {
      id: Number(post_id),
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <>
      {post.parent_id && <PostParentCard post_id={post.parent_id} />}
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
        <PostFooter post={post} isStatus={true}></PostFooter>
        <hr className="mt-4" />
      </div>
    </>
  );
}
