import { Button } from "@/components/ui/button";
import { getUserByUsername } from "@/data/user";
import { currentUser } from "@/lib/auth";
import Image from "next/image";
import { FaAt, FaBorderAll, FaCamera, FaPen, FaUser } from "react-icons/fa";
import EdgeStore from "@/components/upload/EdgeStore";
import { EdgeStoreProvider } from "@/lib/edgestore";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    <EdgeStoreProvider>
      <section>
        <section className="flex flex-col items-center justify-center p-5">
          <div className="relative bg-secondary  w-[200px] h-[200px] text-9xl font-bold text-center flex justify-center items-center p-3 rounded-full">
            {user?.image ? (
              <Dialog>
                <DialogTrigger>
                  {" "}
                  <div className="overflow-hidden  w-[200px] h-[200px]">
                    <Image
                      src={user.image}
                      className="w-full h-full object-cover rounded-full  border border-destructive"
                      alt="Profile"
                      width={400}
                      height={400}
                    />
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <Link href={user.image}>
                    <Image
                      src={user.image}
                      className="w-full h-full"
                      alt="Profile"
                      width={500}
                      height={600}
                    />
                  </Link>
                </DialogContent>
              </Dialog>
            ) : (
              <FaUser className="" />
            )}
            <span className="absolute bottom-5 right-4 w-[40px] h-[40px] font-bold bg-white text-center flex justify-center items-center p-2 rounded-full">
              <Dialog>
                <DialogTrigger asChild>
                  <FaCamera className="text-blue-500 text-xl cursor-pointer" />
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
                        <b className="text-gray-600">JPG, or PNG only</b>{" "}
                        format.
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
            <p className="text-center text-sm text-muted-foreground">
              @{userDetails?.username}
            </p>
          </div>
          <div className="center gap-2 mt-3">
            <Button variant="destructive">
              Posts{" "}
              <span className="ml-2 font-bold text-muted-foreground">123</span>
            </Button>
            <Button variant="destructive">
              Followers
              <span className="ml-2 font-bold text-muted-foreground">135k</span>
            </Button>
            <Button variant="destructive">
              Following
              <span className="ml-2 font-bold text-muted-foreground">12</span>
            </Button>
          </div>
          <Button className="my-4">
            Edit profile <FaPen className="ml-2" />
          </Button>
        </section>
        <section className="w-full center">
          <Tabs defaultValue="posts" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="posts">
                <FaBorderAll />
                <span className="ml-2"> Posts</span>
              </TabsTrigger>
              <TabsTrigger value="mentions">
                <FaAt />
                <span className="ml-2"> Mentions</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="posts">
              <div className="center text-center">
                {/*TODO add Posts*/}
                No Posts!
              </div>
            </TabsContent>
            <TabsContent value="mentions">
              <div className="center text-center">
                {/*TODO add Mentions*/}
                No Mentions!
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </section>
    </EdgeStoreProvider>
  );
};

export default page;
