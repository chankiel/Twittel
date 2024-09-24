import { PostCards } from "@/components/post/post-cards";
import { TabsAll } from "@/components/post/post-tabs";
import {
  CalendarDaysIcon,
  MapPinIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import {
  fetchPostsLiked,
  fetchPostsOwned,
  fetchRepliesOwned,
} from "@/lib/actions/fetch-posts";
import { fetchUserWithAddname } from "@/lib/actions/fetch-user";
import { Suspense } from "react";
import { PostCardSkeletons } from "@/components/post/post-card";
import { notFound } from "next/navigation";
import { formatDateProfile } from "@/lib/utils";
import UserAvatar from "@/components/parts/user-avatar";
import { auth } from "@/auth";
import FollowButton from "@/components/profile/follow-button";
import Image from "next/image";
import ContentHeader from "@/components/parts/content-header";
import UnauthLogin from "@/components/login/unauth-login";

export default async function Profile({
  params,
}: {
  params: { addname: string };
}) {
  const session = await auth();
  const userId = session?.user?.id || "";

  const user = await fetchUserWithAddname(userId, params.addname);
  if (!user) {
    notFound();
  }

  const fetchUserPostId = fetchPostsOwned.bind(null, userId, params.addname);
  const fetchPostLikedId = fetchPostsLiked.bind(null, userId, params.addname);
  const fetchRepliesId = fetchRepliesOwned.bind(null, userId, params.addname);

  return (
    <>
    {userId==="" && <UnauthLogin/>}
      <ContentHeader>
        <h1 className="text-2xl font-bold leading-none">{user.username}</h1>
        <p>{user._count.posts} posts</p>
      </ContentHeader>
      <div className="h-[250px] relative">
        <Image
          src={"/sample-bg-image.jpeg"}
          alt="bg-image"
          width={800}
          height={500}
          className="h-full"
        />
        <UserAvatar
          className="absolute h-[150px] w-[150px] -bottom-1/4 left-3 border-4 border-white"
          src={user.image}
        />
      </div>
      <div className="p-3">
        <FollowButton
          userId={userId}
          profileUser={user}
          className="flex justify-end ml-auto"
        />
        <h1 className="text-2xl font-bold leading-none mt-8">
          {user.username}
        </h1>
        <p>@{params.addname}</p>
        <p className="my-3">{user.bio}</p>
        <div className="flex items-center my-3 gap-4">
          {user.location && (
            <div className="flex items-center gap-1">
              <MapPinIcon className="h-6" />
              <p>{user.location}</p>
            </div>
          )}
          {user.website && (
            <Link
              href={`https://${user.website}`}
              className="flex items-center gap-1"
            >
              <LinkIcon className="h-6" />
              <p className="text-blue-400">{user.website}</p>
            </Link>
          )}
          <div className="flex items-center gap-1">
            <CalendarDaysIcon className="h-6" />
            <p>{formatDateProfile(user.createdAt)}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <p>
            <span className="font-bold text-lg">{user._count.following}</span>{" "}
            Following
          </p>
          <p>
            <span className="font-bold text-lg">{user._count.followedBy}</span>{" "}
            Followers
          </p>
        </div>
      </div>

      <TabsAll
        tabs={[
          {
            trigger: "Posts",
            content: (
              <Suspense fallback={<PostCardSkeletons />}>
                <PostCards uploadAble={false} fetchFunction={fetchUserPostId} />
              </Suspense>
            ),
            value: "posts",
          },
          {
            trigger: "Replies",
            content: (
              <Suspense fallback={<PostCardSkeletons />}>
                <PostCards
                  uploadAble={false}
                  fetchFunction={fetchRepliesId}
                  emptyHeading="No Replies yet"
                  emptyPar="Reply your first post so you can keep track of your replies here!"
                  isReplySeq={true}
                />
              </Suspense>
            ),
            value: "replies",
          },
          {
            trigger: "Media",
            content: <div className="min-h-screen"></div>,
            value: "media",
          },
          {
            trigger: "Likes",
            content: (
              <Suspense fallback={<PostCardSkeletons />}>
                <PostCards
                  uploadAble={false}
                  fetchFunction={fetchPostLikedId}
                  emptyHeading="No Likes yet"
                  emptyPar="Like your first post so you can keep track your favorite posts here!"
                />
              </Suspense>
            ),
            value: "likes",
          },
        ]}
      />
    </>
  );
}
