import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <p>Hmm...this page doesn’t exist. Try searching for something else.</p>
      <Link
        href={"/home"}
        className="font-bold rounded-full mt-4 bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Go Back
      </Link>
    </main>
  );
}
