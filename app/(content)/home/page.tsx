import { TabsAll } from "@/components/ui/tabs";
import { PostCards } from "@/components/post/post-cards";

export default function Home() {
  return (
    <>
        <TabsAll
          firstTrigger="Untuk Anda"
          secondTrigger="Mengikuti"
          FirstContent={<PostCards uploadAble={false} />}
          SecondContent={<PostCards uploadAble={false} />}
        ></TabsAll>
    </>
  );
}
