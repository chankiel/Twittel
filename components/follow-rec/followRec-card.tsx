import Link from "next/link";
import { FetchPostsOptions, UserDataFormat } from "@/lib/actions/type-data";
import UserAvatar from "../parts/user-avatar";
import FollowButton from "../profile/follow-button";
import { fetchUsers } from "@/lib/actions/fetch-user";
import paths from "@/path";

function FollowCard({
  user,
  authId,
}: {
  user: UserDataFormat;
  authId: string;
}) {
  return (
    <div className="flex my-6 gap-2 relative">
      <Link href={paths.profile(user.addname || "")}>
        <UserAvatar src={user.image} />
      </Link>
      <Link href={paths.profile(user.addname || "")}>
        <h1 className="font-semibold text-lg leading-none">{user.username}</h1>
        <h2 className="text-gray-500">@{user.addname}</h2>
        <p>{user.bio}</p>
      </Link>

      <FollowButton profileUser={user} userId={authId} className="absolute right-0" />
    </div>
  );
}

interface FollowCardsProps {
  fetchOptions: FetchPostsOptions;
  authId: string;
}

export async function FollowCards({ fetchOptions, authId }: FollowCardsProps) {
  const fetchMatchingUsers = fetchUsers.bind(null, authId, fetchOptions);
  const users = await fetchMatchingUsers();
  return (
    <div className="px-3 min-h-screen">
      {users.length === 0 && (
        <div className="flex mt-10">
          <div className="mx-auto w-1/2">
            <h1 className="font-bold text-3xl">No People with matching name...</h1>
            <p className="text-slate-500">Try searching other keyword</p>
          </div>
        </div>
      )}
      {users.map((user) => {
        return <FollowCard user={user} authId={authId} key={user.addname} />;
      })}
      {/* <Link className="text-blue-400" href={"/explore"}>
        Show more
      </Link> */}
    </div>
  );
}
