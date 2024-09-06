'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loading } from "@/components/parts/twitter-loading";

export default function Home() {
  const router = useRouter();
  const [isLoading] = useState(true);

  useEffect(()=>{
    router.prefetch("/home");
    const timer = setTimeout(()=>{
      router.push("/home");
    },1000);
    return () => clearTimeout(timer);
  },[router]);

  return (
    <>
      {isLoading && <Loading/>}
    </>
  );
}
