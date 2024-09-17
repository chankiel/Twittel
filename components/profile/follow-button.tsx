import { toggleFollow } from "@/lib/actions/crud-user";
import { Button } from "../ui/button";
import EditProfileForm from "./edit-profile-form";

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
    <>
      {userId === profileUser.id ? (
        <div className="flex justify-end">

          <EditProfileForm profileUser={{ ...profileUser, addname: addname}}/>
        </div>
      ) : (
        <form className="flex justify-end" action={toggleFollowWithIds}>
          <Button
            className={`text-lg rounded-full font-extrabold border-2 border-foreground ${
              isFollowed &&
              "bg-background text-foreground hover:bg-red-500 hover:text-red-500 hover:bg-opacity-10 hover:border-red-600"
            }`}
          >
            {isFollowed ? <div className="group">
              <p className="group-hover:hidden">Followed</p>
              <p className="hidden group-hover:block">Unfollow</p>
            </div> : "Follow"}
          </Button>
        </form>
      )}
    </>
  );
}
