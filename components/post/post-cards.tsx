import { PostCard } from "./post-card";
import { PostInput } from "./post-input";
import { type PostDataFormat } from "@/lib/actions";

interface PostCardsProps {
  uploadAble: boolean;
  placeholder?: string;
  fetchFunction: () => Promise<
    PostDataFormat[]
  >;
  emptyHeading?: string;
  emptyPar?: string;
}

export async function PostCards({
  uploadAble,
  placeholder = "What's happening?!",
  fetchFunction,
  emptyHeading = "No Posts",
  emptyPar = "Share your status so people can see what youre up to now!",
}: PostCardsProps) {
  const posts = await fetchFunction();
  return (
    <div>
      {posts.length === 0 && (
        <div className="flex mt-10">
          <div className="mx-auto w-1/2">
            <h1 className="font-bold text-3xl">{emptyHeading}</h1>
            <p className="text-slate-500">{emptyPar}</p>
          </div>
        </div>
      )}
      {uploadAble && <PostInput placeholder={placeholder} />}
      {posts.map((post) => {
        return <PostCard key={post.id} post={post} />;
      })}
    </div>
  );
}
