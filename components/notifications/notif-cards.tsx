import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function NotifCard() {
  return (
    <div className="flex items-center gap-2 border-y px-4 py-3">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <p>
        There was a login to your account @hihi from a new device on Aug 23,
        2024. Review it now.
      </p>
    </div>
  );
}

export function NotifCards() {
  return (
    <div>
      <NotifCard />
      <NotifCard />
      <NotifCard />
    </div>
  );
}
