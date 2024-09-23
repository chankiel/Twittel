import { toggleFollow, updateUserProfile } from "@/lib/actions/crud-user";
import { Button } from "../ui/button";
import ProfileForm from "./profile-form";
import UnfollConfirmation from "./unfollow-confirmation";
import { UserDataFormat } from "@/lib/actions/type-data";
import { cn } from "@/lib/utils";

export default function FollowButton({
  userId,
  profileUser,
  className,
}: {
  userId: string;
  profileUser: UserDataFormat;
  className?: string;
}) {
  const addname = profileUser.addname ?? "";
  const toggleFollowWithIds = toggleFollow.bind(
    null,
    userId,
    profileUser.id,
    addname,
  );
  const isFollowed = profileUser.followedBy.length>0;
  const updateUserWithId = updateUserProfile.bind(null, profileUser.id);
  return (
    <div className={cn(className)}>
      {userId === profileUser.id ? (
        
          <ProfileForm profileUser={profileUser} crudUser={updateUserWithId} isRegister={false}/>
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
