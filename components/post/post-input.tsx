'use client';

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Textarea } from "../ui/textarea";
import { createPost } from "@/lib/actions";
import { useState } from "react";
import { FormFooter } from "./form-footer";

export function PostInput({placeholder, isReply=false}:{placeholder:string,isReply?:boolean}) {
  const [content, setContent] = useState("");

  return (
    <form className="flex p-4 gap-2 border-b-2" action={createPost} onSubmit={()=>{
      setContent("");
    }}>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="w-full">
        <Textarea placeholder={placeholder} className="text-xl" name="content" value={content} onChange={(e)=> setContent(e.target.value)}/>
        <FormFooter isReply={isReply}/>
      </div>
    </form>
  );
}
