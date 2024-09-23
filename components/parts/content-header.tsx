"use client";

import { cn } from "@/lib/utils";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import React from "react";

interface ContentHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export default function ContentHeader({
  children,
  className,
}: ContentHeaderProps) {
  const router = useRouter();

  return (
    <div className={cn("flex items-center px-3 gap-7 py-1", className)}>
      <button
        className="h-6"
        onClick={() => {
          router.back();
        }}
      >
        <ArrowLeftIcon className="h-full" />
      </button>
      <div>
        {children}
      </div>
    </div>
  );
}
