import { PostCardSkeletons, PostStatusCard } from "@/components/post/post-card";
import { PostCards } from "@/components/post/post-cards";
import { fetchPosts } from "@/lib/actions/fetch-posts";
import { Suspense } from "react";
import ContentHeader from "@/components/parts/content-header";
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
      <ContentHeader className="py-4">
        <h1 className="text-2xl font-bold">Post</h1>{" "}
      </ContentHeader>
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
