import { TwitterLogoIcon } from "@radix-ui/react-icons";
import { signInGithub } from "@/lib/actions/auth";
import { Github } from "lucide-react";
import { Button } from "../ui/button";
import LoginCredForm from "./login-credentials";
import ProfileForm from "../profile/profile-form";
import { createUserProfile } from "@/lib/actions/crud-user";

export default function LoginPage() {
  return (
    <>
      <div className="flex md:justify-around justify-center h-screen flex-col md:flex-row items-start md:items-center w-[80%] mx-auto">
        <TwitterLogoIcon className="md:m-5 md:w-[500px] md:h-[500px] w-[100px] h-[100px]" />
        <div className=" p-2">
          <h1 className="font-black text-4xl md:text-7xl md:mb-10 mb-5">
            Happening Now
          </h1>
          <h2 className="font-bold text-2xl md:text-4xl">Join today.</h2>
          <div className="md:w-[60%] md:mx-0 mx-auto">
            <form action={signInGithub} className="w-full">
              <Button
                type="submit"
                className="rounded-full py-6 w-full mt-6 md:text-lg font-bold flex items-center gap-2"
              >
                <Github />
                <p>Sign in With Github</p>
              </Button>
            </form>
            <p className="relative flex items-center justify-center text-center font-bold text-2xl mt-2">
              <span className="bg-white px-3 z-10">or</span>
              <span className="absolute left-0 w-full border-t border-gray-300 top-1/2"></span>
            </p>
            <LoginCredForm />
            <h1 className="mt-10 text-center text-lg font-semibold">Doesn&lsquo;t have an account? </h1>
            <ProfileForm
              crudUser={createUserProfile}
              isRegister={true}
              profileUser={{}}
            />
          </div>
        </div>
      </div>
    </>
  );
}
