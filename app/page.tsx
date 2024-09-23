"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loading } from "@/components/parts/twitter-loading";
import LoginPage from "@/components/login/login-page";
import { useSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status==="authenticated") {
      router.prefetch("/home");
      const timer = setTimeout(() => {
        router.push("/home");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [status, router]);

  if (status !== "loading" && !session) {
    return <LoginPage />;
  }

  return <Loading />;
}
