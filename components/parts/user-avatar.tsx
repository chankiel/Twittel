import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function UserAvatar({
  src,
  fallback="TWT",
  className,
}: {
  src?: string | null;
  fallback?: string;
  className?: string;
}) {
  let imgSrc:string = "https://github.com/shadcn.png";
  if(src!=null){
    imgSrc = src;
  }
  return (
    <Avatar className={className}>
      <AvatarImage src={imgSrc} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}
