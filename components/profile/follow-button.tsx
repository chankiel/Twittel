import { toggleFollow } from "@/lib/actions/crud-user";
import { Button } from "../ui/button";
import EditProfileForm from "./edit-profile-form";
import UnfollConfirmation from "./unfollow-confirmation";

export default function FollowButton({
  userId,
  profileUser,
  isFollowed,
  addname,
}: {
  userId: string;
  profileUser: {
    id: string;
    image: string | null;
    username: string | null;
    bio: string | null;
    location: string | null;
    website: string | null;
    birthdate: Date | null;
  };
  isFollowed: boolean;
  addname: string;
}) {
  const toggleFollowWithIds = toggleFollow.bind(
    null,
    userId,
    profileUser.id,
    addname
  );
  return (
    <div className="flex justify-end">
      {userId === profileUser.id ? (
          <EditProfileForm profileUser={{ ...profileUser, addname: addname }} />
      ) : (
        <>
          {isFollowed ? (
            <UnfollConfirmation unfollowAction={toggleFollowWithIds} addname={addname}/>
          ) : (
            <form action={toggleFollowWithIds}>
              <Button
                className={`text-lg rounded-full font-extrabold border-2 border-foreground `}
              >
                Follow
              </Button>
            </form>
          )}
        </>
      )}
    </div>
  );
}
