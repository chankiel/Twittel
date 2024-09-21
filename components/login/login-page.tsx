import { TwitterLogoIcon } from "@radix-ui/react-icons";
import { signIn } from "@/lib/actions/auth";
import { Github } from "lucide-react";
import { Button } from "../ui/button";

export default function LoginPage() {
  return (
    <>
      <div className="flex justify-center gap-5 h-screen flex-col sm:flex-row items-start sm:items-center">
        <TwitterLogoIcon className="mx-auto sm:m-5 sm:w-[500px] sm:h-[500px] w-[100px] h-[100px]" />
        <div className="h-[500px] p-5 sm:mx-0 mx-auto">
          <h1 className="font-bold text-4xl sm:text-7xl sm:mb-16 mb-5">
            Happening Now
          </h1>
          <h2 className="font-bold text-2xl sm:text-5xl">Join today.</h2>
          <form action={signIn} className="sm:w-1/2 w-full">
            <Button
              type="submit"
              className="rounded-full py-6 w-full mt-6 sm:text-lg font-bold flex items-center gap-2"
            >
              <Github />
              <p>Sign in With Github</p>
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
