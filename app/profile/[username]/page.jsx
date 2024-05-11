import { Button } from "@/components/ui/button";
import { getUserByUsername } from "@/data/user";
import { currentUser } from "@/lib/auth";
import Image from "next/image";
import { FaAt, FaBorderAll, FaCamera, FaPen, FaUser } from "react-icons/fa";
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { redirect } from "next/navigation";

const page = async ({ params }) => {
  //console.log(params.username);
  const user = await currentUser();
  if (user.username == params.username) {
    redirect("/profile");
  }
  const userDetails = await getUserByUsername(params.username);
  if (!userDetails) {
    return (
      <div className="flex w-full h-screen justify-center items-center text-center">
        <h1 className="font-bold text-2xl">User not found!</h1>
      </div>
    );
  }
  return (
    <section>
      <section className="flex flex-col items-center justify-center p-5">
        <div className="bg-secondary  w-[200px] h-[200px] text-9xl font-bold text-center flex justify-center items-center p-3 rounded-full">
          {userDetails?.image ? (
            <Dialog>
              <DialogTrigger>
                {" "}
                <div className="overflow-hidden  w-[200px] h-[200px]">
                  <Image
                    src={userDetails.image}
                    className="w-full h-full object-cover rounded-full  border border-destructive"
                    alt="Profile"
                    width={400}
                    height={400}
                  />
                </div>
              </DialogTrigger>
              <DialogContent>
                <Link href={userDetails.image}>
                  <Image
                    src={userDetails.image}
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
          <Button variant="destructive">Add Friend</Button>
        </div>
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
  );
};

export default page;
