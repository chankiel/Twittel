import { TabsAll } from "@/components/post/post-tabs";
import { PostCards } from "@/components/post/post-cards";

export default function Home() {
  return (
    <>
        <TabsAll
        tabs={[
          {
            trigger: "Untuk Anda",
            content: <PostCards uploadAble={true} />,
            value: "first",
          },
          {
            trigger: "Mengikuti",
            content: <PostCards uploadAble={true} />,
            value: "second",
          },
        ]}
      />
    </>
  );
}
