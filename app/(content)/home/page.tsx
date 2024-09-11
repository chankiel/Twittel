import { TabsAll } from "@/components/post/post-tabs";
import { PostCards } from "@/components/post/post-cards";
import { fetchPostsOwned } from "@/lib/actions";

export default async function Home() {
  const userId = 1;
  const fetchUserPostId = fetchPostsOwned.bind(null,userId);
  return (
    <>
        <TabsAll
        tabs={[
          {
            trigger: "Untuk Anda",
            content: <PostCards uploadAble={true} fetchFunction={fetchUserPostId}/>,
            value: "first",
          },
          {
            trigger: "Mengikuti",
            content: <PostCards uploadAble={true} fetchFunction={fetchUserPostId}/>,
            value: "second",
          },
        ]}
      />
    </>
  );
}
