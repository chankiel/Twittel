import Search from "@/components/parts/search-input";
import { TrendCards } from "@/components/trends/trend-cards";

export default function Explore() {
  return (
    <>
        <Search placeholder="Search"></Search>
        <TrendCards className="h-full"/>
    </>
  );
}
