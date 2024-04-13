import { Button } from "@/components/ui/button";
import { getUserByUsername } from "@/data/user";
import { currentUser } from "@/lib/auth";
import Image from "next/image";
import { FaPen, FaUser } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EdgeStore from "@/components/upload/EdgeStore";

const page = async () => {
  const user = await currentUser();
  const userDetails = await getUserByUsername(user?.username);
  if (!userDetails) {
    return (
      <div className="flex w-full h-screen justify-center items-center text-center">
        <h1 className="font-bold text-2xl">
          Oops! something went wrong. please refresh this page!
        </h1>
      </div>
    );
  }
  return (
    <section>
      <section className="flex flex-col items-center justify-center p-5">
        <div className="relative bg-secondary  w-[200px] h-[200px] text-9xl font-bold text-center flex justify-center items-center p-3 rounded-full">
          {user?.image ? (
            <div className="overflow-hidden w-full h-full">
              <Image
                src={user.image}
                className="w-full h-full object-cover"
                alt="Profile"
                width={100}
                height={100}
              />
            </div>
          ) : (
            <FaUser className="" />
          )}
          <span className="absolute bottom-5 right-4 w-[40px] h-[40px] font-bold bg-white text-center flex justify-center items-center p-2 rounded-full">
            <Dialog>
              <DialogTrigger asChild>
                <FaPen className="text-blue-500 text-xl cursor-pointer" />
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Select profile picture</DialogTitle>
                  <DialogDescription>
                    <p className="font-normal text-sm text-gray-400">
                      Choose photo size should be less than{" "}
                      <b className="text-gray-600">2mb</b>
                    </p>
                    <p className="font-normal text-sm text-gray-400">
                      and should be in{" "}
                      <b className="text-gray-600">JPG, or PNG only</b> format.
                    </p>
                  </DialogDescription>
                </DialogHeader>
                <EdgeStore user={user} />
              </DialogContent>
            </Dialog>
          </span>
        </div>
        <div>
          <h1 className="text-2xl text-center">
            {userDetails?.firstname + " " + userDetails?.lastname}
          </h1>
          <p className="text-center text-sm">@{userDetails?.username}</p>
        </div>
        <Button className="my-4">
          Edit profile <FaPen className="ml-2" />
        </Button>
      </section>
      <hr className="my-5 h-1 bg-destructive w-full" />
      <section></section>
    </section>
  );
};

export default page;
