import { GifIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { Button } from "../ui/button";

export function FormFooter(){
    return (
        <div className="flex items-center mt-3 gap-3">
            <PhotoIcon className="h-[25px]"/>
            <GifIcon className="h-[25px]"/>
            <Button className="ml-auto rounded-full text-lg font-bold" type="submit"> Post</Button>
        </div>
    )
}