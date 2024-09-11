"use client";
import {toggleLike, toggleBookmark} from "@/lib/actions"

interface PostActionProps{
    type: string;
    user_id: number;
    post_id: number;
    children: React.ReactNode;
}

export default function PostAction({
    type,
    user_id,
    post_id,
    children,
}:PostActionProps){
    let postAction = toggleLike;
    if(type==="bookmark"){
        postAction = toggleBookmark;
    }

    const postActionWithId = postAction.bind(null,user_id,post_id);

    return (
        <form className="w-[24px] h-full" action={postActionWithId}>
            <button type="submit" className="w-full h-full" onClick={(e)=>{
                e.stopPropagation();
            }}>
                {children}
            </button>
        </form>
    )
}