import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function UnfollConfirmation({unfollowAction,
    addname}:{
    unfollowAction: () => Promise<void>;
    addname: string;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={`group h-10 text-lg rounded-full font-extrabold border-2 border-foreground px-4 py-1
              bg-background text-foreground hover:bg-red-500 hover:text-red-500 hover:bg-opacity-10 hover:border-red-600`}
      >
        <p className="group-hover:hidden">Followed</p>
        <p className="hidden group-hover:block">Unfollow</p>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-extrabold text-xl">Stop following @{addname}?</AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            Their posts will no longer appear in your For You timeline. You will
            still be able to see their profile, unless their posts are
            protected.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {/* <AlertDialogFooter className="flex flex-col"> */}
          <form action={unfollowAction} className="mt-3">
            <AlertDialogAction type="submit" className="w-full font-extrabold text-lg rounded-full py-6">Unfollow</AlertDialogAction>
          </form>
          <AlertDialogCancel className="text-lg font-extrabold rounded-full py-6 border-2 border-foreground">Cancel</AlertDialogCancel>
        {/* </AlertDialogFooter> */}
      </AlertDialogContent>
    </AlertDialog>
  );
}
