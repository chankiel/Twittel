import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import Link from "next/link";

function FollowCard() {
  return (
    <div className="flex items-center my-6 gap-2">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <h1 className="font-semibold text-lg leading-none">Media Indonesia</h1>
        <h2>@mediaIndonesia</h2>
      </div>
      <Button className="rounded-full ml-auto">Follow</Button>
    </div>
  );
}

export function FollowCards() {
  return (
    <div className="border rounded-xl px-3 py-5 mt-3">
      <h1 className="text-xl font-bold">Who to Follow</h1>
      <FollowCard />
      <FollowCard />
      <FollowCard />
      <Link className="text-blue-400" href={"/explore"}>
        Show more
      </Link>
    </div>
  );
}
