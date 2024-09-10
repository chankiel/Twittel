import { PostCard } from "./post-card";
import { PostInput } from "./post-input";
import prisma from "@/lib/db";
import { fetchPosts, type PostDataFormat, type FetchPostsOptions } from "@/lib/actions";

interface PostCardsProps {
  uploadAble: boolean;
  placeholder?: string;
  fetchOptions?: FetchPostsOptions;
}

export async function PostCards({
  uploadAble,
  placeholder = "What's happening?!",
    fetchOptions = {}
}: PostCardsProps) {
    const cards = await fetchPosts(fetchOptions);
  return (
    <div>
      {uploadAble && <PostInput placeholder={placeholder} />}
      {cards.map((card) => {
        const isLiked = card.likedBy.length > 0;
        const isBookmarked = card.bookmarkedBy.length > 0;
        return <PostCard key={card.id} post={card} bookmarked={isBookmarked} liked={isLiked}/>;
      })}
    </div>
  );
}
