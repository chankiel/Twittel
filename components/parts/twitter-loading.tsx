import { TwitterLogoIcon } from "@radix-ui/react-icons"

export function Loading(){
    return(
        <div className="fixed flex flex-col items-center top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] ">
            <TwitterLogoIcon className="h-16 w-16"/>
            <div className="loader mt-5"></div>
        </div>
    )
}