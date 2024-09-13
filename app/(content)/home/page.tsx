import { TabsAll } from "@/components/post/post-tabs";
import { PostCards } from "@/components/post/post-cards";
import { fetchPosts, fetchPostsFollowed } from "@/lib/actions";
import { userId } from "@/lib/placeholder-data";
import { Suspense } from "react";
import { PostCardSkeleton, PostCardSkeletons } from "@/components/post/post-card";

export default function Home() {
  const fetchPostFollowedId = fetchPostsFollowed.bind(null, userId);

  return (
    <>
      <TabsAll
        tabs={[
          {
            trigger: "Untuk Anda",
            content: 
            <Suspense fallback={<PostCardSkeletons uploadAble={true}/>}>
              <PostCards uploadAble={true} fetchFunction={fetchPosts} />
            </Suspense>
            ,
            value: "first",
          },
          {
            trigger: "Mengikuti",
            content: (
              <Suspense fallback={<PostCardSkeletons uploadAble={true}/>}>
                <PostCards
                  uploadAble={true}
                  fetchFunction={fetchPostFollowedId}
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
