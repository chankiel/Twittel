import { auth } from "@/auth";
import Search from "@/components/parts/search-input";
import { PostCardSkeletons } from "@/components/post/post-card";
import { PostCards } from "@/components/post/post-cards";
import { TabsAll } from "@/components/post/post-tabs";
import { fetchPosts } from "@/lib/actions/fetch-posts";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { FollowCards } from "@/components/follow-rec/followRec-card";

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: {
    search?: string;
  };
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }
  const query = searchParams?.search || "";
  if(query === ""){
    redirect("/explore");
  }
  const authId = session.user.id;

  const fetchRecentPosts = fetchPosts.bind(null, {
    selectLikeAndBookmarkFields: {
      where: { id: authId },
      select: { id: true },
    },
    where: {
      content: {
        contains: query,
      },
    },
  });

  const fetchMostLikedPosts = fetchPosts.bind(null,{
    selectLikeAndBookmarkFields: {
      where: { id: authId },
      select: { id: true },
    },
    orderBy:{
      likedBy:{
        _count: 'desc',
      }
    },
    where: {
      content: {
        contains: query,
      },
    },
  });

  const fetchMatchingUsersOption = {
    where: {
      OR: [
        {
          addname: {
            contains: query,
          },
        },
        {
          username: {
            contains: query,
          },
        },
      ],
      id: { not: authId },
    },
  };
  

  return (
    <>
      <Suspense>
        <Search
          placeholder="Search"
          className="ml-3 mb-4"
          defaultValue={query}
        />
      </Suspense>
      <TabsAll
        tabs={[
          {
            trigger: "Popular",
            content: (
              <Suspense fallback={<PostCardSkeletons uploadAble={true} />}>
                <PostCards fetchFunction={fetchMostLikedPosts} />
              </Suspense>
            ),
            value: "first",
          },
          {
            trigger: "Recent",
            content: (
              <Suspense fallback={<PostCardSkeletons uploadAble={true} />}>
                <PostCards
                  fetchFunction={fetchRecentPosts}
                />
              </Suspense>
            ),
            value: "second",
          },
          {
            trigger: "People",
            content: (
              <Suspense fallback={<PostCardSkeletons uploadAble={true} />}>
                <FollowCards
                  authId={authId}
                  fetchOptions={fetchMatchingUsersOption}
                />
              </Suspense>
            ),
            value: "third",
          },
          {
            trigger: "Media",
            content: <div></div>,
            value: "fourth",
          },
        ]}
      />
    </>
  );
}