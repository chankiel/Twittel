import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  UserCircleIcon,
  SpeakerXMarkIcon,
  UserMinusIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";

export function PostOptions({
  className,
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(className)}>
        <Image
          src={"/option.png"}
          width={20}
          height={20}
          alt="post-option"
        ></Image>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <div className="h-6 flex items-center gap-2">
            <UserCircleIcon className="h-full" />
            <p className="font-bold">Tidak tertarik dengan postingan ini</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="h-6 flex items-center gap-2">
            <UserMinusIcon className="h-full" />
            <p className="font-bold">Setop ikuti @jokowi</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="h-6 flex items-center gap-2">
            <SpeakerXMarkIcon className="h-full" />
            <p className="font-bold">Bisukan @jokowi</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="h-6 flex items-center gap-2">
            <NoSymbolIcon className="h-full" />
            <p className="font-bold">Blokir @jokowi</p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
