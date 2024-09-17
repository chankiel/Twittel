import { PostCard } from "./post-card";
import { PostInput } from "./post-input";
import { type PostDataFormat } from "@/lib/actions/type-data";

interface PostCardsProps {
  uploadAble: boolean;
  placeholder?: string;
  fetchFunction: () => Promise<
    PostDataFormat[]
  >;
  emptyHeading?: string;
  emptyPar?: string;
  parent_id?:number;
  isReplySeq?:boolean;
}

export async function PostCards({
  uploadAble,
  placeholder = "What's happening?!",
  fetchFunction,
  emptyHeading = "No Posts",
  emptyPar = "Share your status so people can see what youre up to now!",
  parent_id=-1,
  isReplySeq=false,
}: PostCardsProps) {
  const posts = await fetchFunction();
  return (
    <div className="min-h-screen">
      {uploadAble && <PostInput placeholder={placeholder} parent_id={parent_id} />}
      {posts.length === 0 && (
        <div className="flex mt-10">
          <div className="mx-auto w-1/2">
            <h1 className="font-bold text-3xl">{emptyHeading}</h1>
            <p className="text-slate-500">{emptyPar}</p>
          </div>
        </div>
      )}
      {posts.map((post) => {
        return <PostCard key={post.id} post={post} isReplySeq={isReplySeq}/>;
      })}
    </div>
  );
}
