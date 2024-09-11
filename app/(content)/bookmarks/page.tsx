import Search from "@/components/parts/search-input";
import { PostCards } from "@/components/post/post-cards";
import { fetchPostsBookmarked } from "@/lib/actions";

export default async function Bookmarks() {
  const userId = 1;
  const fetchBookmarkWithId = fetchPostsBookmarked.bind(null,userId);

  return (
    <>
      <div className="py-1 ml-3">
        <h1 className="text-2xl font-bold leading-none">Bookmarks</h1>
        <p>@hehehe</p>
      </div>
      <Search placeholder="Search" className="ml-3"></Search>
      <PostCards
        uploadAble={false}
        emptyHeading="Save post for later"
        emptyPar="Bookmark posts so you can find them easily later"
        fetchFunction={fetchBookmarkWithId}
      />
    </>
  );
}
