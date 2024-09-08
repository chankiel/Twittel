import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {PhotoIcon, GifIcon} from "@heroicons/react/24/outline"

export function PostInput({placeholder}:{placeholder:string}) {
  return (
    <div className="flex p-4 gap-2 border-b-2">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="w-full">
        <Textarea placeholder={placeholder} className="text-xl"/>
        <div className="flex items-center mt-3 gap-3">
            <PhotoIcon className="h-[25px]"/>
            <GifIcon className="h-[25px]"/>
            <Button className="ml-auto rounded-full text-lg font-bold"> Post</Button>
        </div>
      </div>
    </div>
  );
}
