import Search from "@/components/parts/search-input";
import { PostCards } from "@/components/post/post-cards";

export default function Bookmarks() {
  return (
    <>
      <div className="py-4 ml-3">
        <h1 className="text-2xl font-bold leading-none">Notifications</h1>
        <p>@ngentotko</p>
      </div>
      <Search placeholder="Search" className="ml-3"></Search>
      <PostCards uploadAble={false}/>
    </>
  );
}
