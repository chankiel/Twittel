import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { PostCardSkeletons, PostStatusCard } from "@/components/post/post-card";
import { PostCards } from "@/components/post/post-cards";
import { fetchPosts } from "@/lib/actions";
import { Suspense } from "react";
import paths from "@/path";

export default function Post({
  params,
}: {
  params: { id: string; addname: string };
}) {
  const post_id = Number(params.id);
  const fetchReplies = fetchPosts.bind(null, {
    where: {
      parent_id: Number(params.id),
    },
  });
  return (
    <div>
      <div className="flex items-center px-3 gap-7 py-4">
        <Link href={paths.home()} className="h-6">
          <ArrowLeftIcon className="h-full" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Post</h1>{" "}
        </div>
      </div>
      <PostStatusCard post_id={post_id} addname={params.addname} />
      <Suspense
        fallback={
          <PostCardSkeletons
            uploadAble={true}
            placeholder={"Post your reply"}
          />
        }
      >
        <PostCards
          uploadAble={true}
          placeholder="Post your reply"
          emptyHeading="There's no reply at the moment"
          emptyPar="Be the first to reply!"
          fetchFunction={fetchReplies}
          parent_id={post_id}
        />
      </Suspense>
    </div>
  );
}
