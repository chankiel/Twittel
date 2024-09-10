import { PostCard } from "./post-card";
import { PostInput } from "./post-input";
import prisma from "@/lib/db";

interface PostCardsProps {
  uploadAble: boolean;
  placeholder?: string;
}

export async function PostCards({
  uploadAble,
  placeholder = "What's happening?!",
}: PostCardsProps) {
  const cards = await prisma.post.findMany({
    orderBy: {
      datetime_post: "desc",
    },
    select: {
      id: true,
      content: true,
      datetime_post:true,
      author: {
        select: {
          username: true,
          addname: true,
        },
      },
      _count: {
        select: { likedBy: true, bookmarkedBy: true, replies: true },
      },
    },
  });

  return (
    <div>
      {uploadAble && <PostInput placeholder={placeholder} />}
      {cards.map((card) => {
        return (
          <PostCard
            key={card.id}
            post={card}
          />
        );
      })}
    </div>
  );
}
