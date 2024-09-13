'use client';

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Textarea } from "../ui/textarea";
import { createPost } from "@/lib/actions";
import { useState } from "react";
import { FormFooter } from "./form-footer";

export function PostInput({ placeholder, parent_id = -1,isModal = false }: { placeholder?: string; parent_id?: number, isModal?:boolean }) {
  const [content, setContent] = useState("");
  const isReply = parent_id !== -1;
  const isReplyModal = isReply && isModal;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    if (isReply) {
      await createPost(formData, parent_id);
    } else {
      await createPost(formData);
    }
    
    setContent("");
  };

  return (
    <form className="flex p-4 gap-2 border-b-2" onSubmit={handleSubmit}>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="w-full">
        <Textarea placeholder={placeholder} className="text-xl" name="content" value={content} onChange={(e) => setContent(e.target.value)} />
        <FormFooter isReply={isReplyModal} />
      </div>
    </form>
  );
}

