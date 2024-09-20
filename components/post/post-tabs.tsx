import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface Tab {
    trigger: string;
    content: React.ReactNode;
    value: string;
  }
  
  interface TabsProps {
    tabs: Tab[];
    defaultValue?: string;
  }
  
  export const TabsAll = ({ tabs, defaultValue }: TabsProps) => {
    return (
      <Tabs defaultValue={defaultValue || tabs[0].value} className="w-full">
        <TabsList className="w-full h-[50px] sticky top-0 z-50 bg-opacity-75">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              className="font-bold text-lg w-full h-full data-[state=active]:border-b-[6px] data-[state=active]:border-blue-500"
              value={tab.value}
            >
              {tab.trigger}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    );
  };