import Link from "next/link";

export default function UnauthLogin() {
  return (
    <div className="bg-blue-500 fixed bottom-0 left-0 flex justify-center w-full z-20 py-5 gap-10">
      <div className="text-background">
        <h1 className="text-xl font-bold">Don&lsquo;t miss what&lsquo;s happening</h1>
        <h2>People on Twittel are the first to know.</h2>
      </div>
      <Link
        href={"/"}
        className="rounded-full font-bold text-lg mt-1 px-4 py-2 bg-white text-blue-500"
      >
        Log In
      </Link>
    </div>
  );
}
