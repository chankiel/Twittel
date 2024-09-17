import { auth } from "@/auth";
import Search from "@/components/parts/search-input";
import { PostCardSkeletons } from "@/components/post/post-card";
import { PostCards } from "@/components/post/post-cards";
import { fetchPostsBookmarked } from "@/lib/actions";
import { Suspense } from "react";

export default async function Bookmarks() {
  const session = await auth();
  const userId: string = session?.user?.id || "";
  const fetchBookmarkWithId = fetchPostsBookmarked.bind(null, userId);

  return (
    <>
      <div className="py-1 ml-3">
        <h1 className="text-2xl font-bold leading-none">Bookmarks</h1>
        <p>@hehehe</p>
      </div>
      <Suspense>
      <Search placeholder="Search" className="ml-3"></Search>
      </Suspense>
      <Suspense fallback={<PostCardSkeletons />}>
        <PostCards
          uploadAble={false}
          emptyHeading="Save post for later"
          emptyPar="Bookmark posts so you can find them easily later"
          fetchFunction={fetchBookmarkWithId}
        />
      </Suspense>
    </>
  );
}
