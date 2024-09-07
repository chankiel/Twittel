"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-neutral-100 p-1 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap px-3 py-1 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-neutral-950 data-[state=active]:shadow dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300 dark:data-[state=active]:bg-neutral-950 dark:data-[state=active]:text-neutral-50",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

interface TabsProps {
  firstTrigger: string;
  secondTrigger: string;
  thirdTrigger?: string;
  FirstContent: React.ReactNode;
  SecondContent: React.ReactNode;
  ThirdContent?: React.ReactNode;
  firstValue?: string;
  secondValue?: string;
  thirdValue?: string;
}

export const TabsAll = ({
  firstTrigger,
  secondTrigger,
  thirdTrigger,
  FirstContent,
  SecondContent,
  ThirdContent,
  firstValue = "firstValue",
  secondValue = "secondValue",
  thirdValue = "thirdValue",
}: TabsProps) => {
  return (
    <Tabs defaultValue={firstValue} className="w-full">
      <TabsList className="w-full h-[50px]">
        <TabsTrigger className="font-bold text-lg w-full h-full data-[state=active]:border-b-[6px] data-[state=active]:border-blue-500 " value={firstValue}>
          {firstTrigger}
        </TabsTrigger>
        <TabsTrigger className="font-bold text-lg w-full h-full data-[state=active]:border-b-[6px] data-[state=active]:border-blue-500" value={secondValue}>
          {secondTrigger}
        </TabsTrigger>
        {thirdTrigger && (
          <TabsTrigger className="w-full h-full data-[state=active]:border-b-[6px] data-[state=active]:border-blue-500" value={thirdValue}>
            {thirdTrigger}
          </TabsTrigger>
        )}
      </TabsList>
      <TabsContent value={firstValue}>{FirstContent}</TabsContent>
      <TabsContent value={secondValue}>{SecondContent}</TabsContent>
      {ThirdContent && (
        <TabsContent value={thirdValue}>{ThirdContent}</TabsContent>
      )}
    </Tabs>
  );
};

export { Tabs, TabsList, TabsTrigger, TabsContent };
