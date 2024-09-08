import { PostData } from "@/lib/placeholder-data";
import { PostCard } from "./post-card";
import { PostInput } from "./post-input";

interface PostCardsProps{
    uploadAble: boolean;
    placeholder?: string;
}

export function PostCards({uploadAble, placeholder="What's happening?!"}:PostCardsProps){
    return(
        <div>
            {uploadAble && <PostInput placeholder={placeholder}/>}
            {PostData.map((data)=>{
                return <PostCard key={data.author}/>
            })}
        </div>
    )
}