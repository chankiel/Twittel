import { GifIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { Button } from "../ui/button";
import { DialogClose } from "../ui/dialog";

export function FormFooter({ isReply }: { isReply: boolean }) {
  return (
    <div className="flex items-center mt-3 gap-3">
      <PhotoIcon className="h-[25px]" />
      <GifIcon className="h-[25px]" />
      {isReply ? (
        <DialogClose asChild>
          <Button
            className="ml-auto rounded-full text-lg font-bold"
            type="submit"
          >
            {" "}
            Post
          </Button>
        </DialogClose>
      ) : (
        <Button
          className="ml-auto rounded-full text-lg font-bold"
          type="submit"
        >
          {" "}
          Post
        </Button>
      )}
    </div>
  );
}
