import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PostOptions } from "./post-option";
import type { PostDataFormat } from "@/lib/actions";
import Link from "next/link";
import PostFooter from "./post-footer";
import { diffNow } from "@/lib/utils";

export function PostCard({
  post,
}: {
  post: PostDataFormat;
}) {
  const diffTimeString = diffNow(post.datetime_post);

  return (
    <div
      className="flex p-3 border-b relative"
      
    >
      <PostOptions className="absolute right-4" post_id={post.id} />
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="ml-3 w-full">
        <Link href={`/${post.author.addname}/status/${post.id}`}>
        <h3 className="font-bold text-lg">
          {post.author.username}{" "}
          <span>
            @{post.author.addname} . {diffTimeString}
          </span>
        </h3>
        <p className="mb-2">{post.content}</p>
        </Link>
        {/* <Image
          src={"/imagepost-1.png"}
          width={300}
          height={300}
          alt="image-post"
        /> */}
        <PostFooter post={post}/>
      </div>
    </div>
  );
}

export function PostStatusCard({
  post,
}: {
  post: PostDataFormat;
}) {
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
        <PostFooter post={post} isStatus={true}></PostFooter>
        <hr className="mt-4"/>
      </div>
    </>
  );
}
