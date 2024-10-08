import {toggleLike, toggleBookmark} from "@/lib/actions/crud-post"

interface PostActionProps{
    type: string;
    user_id: string;
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
            <button type="submit" className="w-full h-full">
                {children}
            </button>
        </form>
    )
}