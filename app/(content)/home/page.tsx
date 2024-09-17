import { TabsAll } from "@/components/post/post-tabs";
import { PostCards } from "@/components/post/post-cards";
import { fetchPosts, fetchPostsFollowed } from "@/lib/actions";
import { Suspense } from "react";
import { PostCardSkeletons } from "@/components/post/post-card";
import { auth } from "@/auth";
import { notFound } from "next/navigation";

export default async function Home() {
  const session = await auth();  
  if(!session?.user){
    notFound();
  }
  const fetchPostFollowedId = fetchPostsFollowed.bind(null, session.user.id);
  const fetchPostWithLBStatus = fetchPosts.bind(null,{selectLikeAndBookmarkFields: {
    where: { id: session.user.id },
    select: { id: true },
  }})
  return (
    <>
      <TabsAll
        tabs={[
          {
            trigger: "Untuk Anda",
            content: (
              <Suspense fallback={<PostCardSkeletons uploadAble={true} />}>
                <PostCards uploadAble={true} fetchFunction={fetchPostWithLBStatus} />
              </Suspense>
            ),
            value: "first",
          },
          {
            trigger: "Mengikuti",
            content: (
              <Suspense fallback={<PostCardSkeletons uploadAble={true} />}>
                <PostCards
                  uploadAble={true}
                  fetchFunction={fetchPostFollowedId}
                  emptyHeading="No Posts by your following currently.."
                  emptyPar="Follow more people to know what they're up to!"
                />
              </Suspense>
            ),
            value: "second",
          },
        ]}
      />
    </>
  );
}
