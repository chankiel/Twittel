import { PostData } from "@/lib/placeholder-data";
import { PostCard } from "./post-card";

interface PostCardsProps{
    uploadAble: boolean;
}

export function PostCards({uploadAble}:PostCardsProps){
    return(
        <div>
            {PostData.map((data)=>{
                return <PostCard key={data.author}/>
            })}
        </div>
    )
}