import { PostCards } from "@/components/post/post-cards";
import { Button } from "@/components/ui/button";
import { TabsAll } from "@/components/ui/tabs";
import { ArrowLeftIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";

export default function Profile() {
  return (
    <>
      <div className="flex items-center px-3 gap-7 py-1">
        <ArrowLeftIcon className="h-6" />
        <div>
          <h1 className="text-2xl font-bold leading-none">minasankonijiwa</h1>
          <p>0 posts</p>
        </div>
      </div>
      <div className="h-[250px] bg-gray-600 relative">
        <div className="absolute h-[150px] w-[150px] rounded-full bg-blue-800 -bottom-1/4 left-3 border-4 border-white">
            
        </div>
      </div>
      <div className="p-3">
        <div className="flex justify-end">
        <Button className="rounded-full font-bold">Edit Profile</Button>
        </div>
        <h1 className="text-2xl font-bold leading-none mt-8">minnasankonnijiwa</h1>
        <p>@ngentotko</p>
        <div className="flex items-center my-3">
            <CalendarDaysIcon className="h-8"/>
            <p>Joined July 2024</p>
        </div>
        <div className="flex items-center gap-4">
            <p><span className="font-bold text-lg">1</span> Following</p>
            <p><span className="font-bold text-lg">0</span> Followers</p>
        </div>
      </div>
      <TabsAll
          firstTrigger="Untuk Anda"
          secondTrigger="Mengikuti"
          FirstContent={<PostCards uploadAble={false} />}
          SecondContent={<PostCards uploadAble={false} />}
        ></TabsAll>
    </>
  );
}
