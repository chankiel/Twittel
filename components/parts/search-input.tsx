'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, useRouter } from 'next/navigation';
import { FormEventHandler, useState } from 'react';
import { cn } from '@/lib/utils';

export default function Search({ placeholder, className, defaultValue="" }: { placeholder: string, className?:string;defaultValue?:string }) {
  const searchParams = useSearchParams();
  const {replace} = useRouter();
  const [inputVal,setInputVal] = useState(defaultValue);
  const handleSearch: FormEventHandler<HTMLFormElement> = (e) => {   
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (inputVal) {
      params.set('search', inputVal);
    } else {
      params.delete('search');
    }
    replace(`/search?${params.toString()}`);
  };

  return (
    <form className={cn("relative", "flex", "flex-1", "flex-shrink-0", "h-[50px]", "pt-1",className)} onSubmit={handleSearch}>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-full border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 "
        placeholder={placeholder}
        onChange={(e)=>{
          setInputVal(e.target.value);
        }}
        value={inputVal}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </form>
  );
}