"use client";

import { Textarea } from "../ui/textarea";
import { createPost } from "@/lib/actions/crud-post";
import { useState } from "react";
import { GifIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { Button } from "../ui/button";
import { DialogClose } from "../ui/dialog";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import UserAvatar from "../parts/user-avatar";

export function PostInput({
  placeholder,
  parent_id = -1,
  isModal = false,
}: {
  placeholder?: string;
  parent_id?: number;
  isModal?: boolean;
}) {
  const [content, setContent] = useState("");
  const {data:session,status} = useSession();
  const isReply = parent_id !== -1;
  const isReplyModal = isReply && isModal;
  const userId = session?.user?.id || '';
  const {replace} = useRouter();

  const buttonContent = (
    <Button
      className="ml-auto rounded-full text-lg font-bold"
      type="submit"
      disabled={content === ""}
    >
      {" "}
      Post
    </Button>
  );

  const insideForm = (
    <>
      <UserAvatar src={session?.user?.image}></UserAvatar>
      <div className="w-full">
        <Textarea
          placeholder={placeholder}
          className="text-xl"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex items-center mt-3 gap-3">
          <PhotoIcon className="h-[25px]" />
          <GifIcon className="h-[25px]" />
          {isReplyModal ? (
            <DialogClose asChild>{buttonContent}</DialogClose>
          ) : (
            <>{buttonContent}</>
          )}
        </div>
      </div>
    </>
  );

  if(status === "loading"){
    return(
      <div className="flex p-4 gap-2 border-b-2">
        {insideForm}
      </div>
    )
  }

  if(status === "unauthenticated"){
    replace("/");
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (isReply) {
      await createPost(formData, userId, parent_id);
    } else {
      await createPost(formData,userId);
    }

    setContent("");
  };

  return (
    <form className="flex p-4 gap-2 border-b-2" onSubmit={handleSubmit}>
      {insideForm}
    </form>
  );
}
