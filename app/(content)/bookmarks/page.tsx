import Search from "@/components/parts/search-input";
import { PostCard } from "@/components/post/post-card";
import { PostCards } from "@/components/post/post-cards";


export default function Bookmarks() {
  const userId = 1;
  const fetchOption = {
    where: {
      bookmarkedBy: {
        some: { id: userId },
      },
    },
    orderBy: { datetime_post: 'desc' },
  }
  return (
    <>
      <div className="py-1 ml-3">
        <h1 className="text-2xl font-bold leading-none">Bookmarks</h1>
        <p>@hehehe</p>
      </div>
      <Search placeholder="Search" className="ml-3"></Search>
      <PostCards uploadAble={false} fetchOptions={fetchOption} />
    </>
  );
}
