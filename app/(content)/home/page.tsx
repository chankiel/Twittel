import { TabsAll } from "@/components/post/post-tabs";
import { PostCards } from "@/components/post/post-cards";
import { fetchPosts, fetchPostsFollowed } from "@/lib/actions";

export default function Home() {
  const userId = 1;
  const fetchPostFollowedId = fetchPostsFollowed.bind(null,userId);

  return (
    <>
        <TabsAll
        tabs={[
          {
            trigger: "Untuk Anda",
            content: <PostCards uploadAble={true} fetchFunction={fetchPosts}/>,
            value: "first",
          },
          {
            trigger: "Mengikuti",
            content: <PostCards uploadAble={true} fetchFunction={fetchPostFollowedId}/>,
            value: "second",
          },
        ]}
      />
    </>
  );
}
