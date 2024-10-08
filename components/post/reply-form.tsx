import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PostInput } from "./post-input";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { PostDataFormat } from "@/lib/actions/type-data";
import { diffNow } from "@/lib/utils";
import UserAvatar from "../parts/user-avatar";

interface ReplyFormProps {
  parent_post: PostDataFormat;
}

export function ReplyForm({ parent_post }: ReplyFormProps) {
  const diffTimeString = diffNow(parent_post.datetime_post);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <ChatBubbleLeftIcon className="max-h-full hover:text-blue-500 hover:bg-blue-500 rounded-full hover:bg-opacity-30 hover:shadow-sm hover:shadow-blue-500" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <div className="flex p-3 relative border-b">
          <UserAvatar src={parent_post.author.image}/>
          <div className="ml-3 w-full">
            <h3 className="font-bold text-lg">
              {parent_post.author.username}{" "}
              <span>
                @{parent_post.author.addname} . {diffTimeString}
              </span>
            </h3>
            <p className="mb-2">{parent_post.content}</p>
            <p className="text-slate-500">Membalas <span className="font-semibold text-blue-600">@{parent_post.author.addname}</span></p>
          </div>
        </div>
        <PostInput placeholder="Posting balasan Anda" parent_id={parent_post.id} isModal={true} />
      </DialogContent>
    </Dialog>
  );
}
