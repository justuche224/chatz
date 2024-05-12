import { Button } from "@/components/ui/button";
import { getUserByUsername } from "@/data/user";
import { currentUser } from "@/lib/auth";
import Image from "next/image";
import { FaAt, FaBorderAll, FaCamera, FaPen, FaUser } from "react-icons/fa";
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { redirect } from "next/navigation";
import { getProfileOwnerPosts } from "@/actions/getProfileOwnerPosts";
import FormError from "@/components/form-error";
import Post from "@/components/Post";

const page = async ({ params }) => {
  //console.log(params.username);
  const user = await currentUser();
  if (user.username == params.username) {
    redirect("/profile");
  }
  const profileOwnerDetails = await getUserByUsername(params.username);

  if (!profileOwnerDetails) {
    return (
      <div className="flex w-full h-screen justify-center items-center text-center">
        <h1 className="font-bold text-2xl">User not found!</h1>
      </div>
    );
  }

  const profileOwnerPosts = await getProfileOwnerPosts(profileOwnerDetails);

  return (
    <section>
      <section className="flex flex-col items-center justify-center p-5">
        <div className="bg-secondary  w-[200px] h-[200px] text-9xl font-bold text-center flex justify-center items-center p-3 rounded-full">
          {profileOwnerDetails?.image ? (
            <Dialog>
              <DialogTrigger>
                {" "}
                <div className="overflow-hidden  w-[200px] h-[200px]">
                  <Image
                    src={profileOwnerDetails.image}
                    className="w-full h-full object-cover rounded-full  border border-destructive"
                    alt="Profile"
                    width={400}
                    height={400}
                  />
                </div>
              </DialogTrigger>
              <DialogContent>
                <Link href={profileOwnerDetails.image}>
                  <Image
                    src={profileOwnerDetails.image}
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
            {profileOwnerDetails?.firstname +
              " " +
              profileOwnerDetails?.lastname}
          </h1>
          <p className="text-center text-sm text-muted-foreground">
            @{profileOwnerDetails?.username}
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
              {profileOwnerPosts.message ? (
                <div className="center text-center flex flex-col items-center w-full h-full pb-16">
                  <div className="w-full max-w-xl h-full bg-black flex flex-col items-center py-10 gap-10">
                    <FormError message={profileOwnerPosts.message} />
                  </div>
                </div>
              ) : (
                <div className="center text-center flex flex-col items-center w-full h-full pb-16">
                  {profileOwnerPosts ? (
                    <div className="w-full max-w-xl h-full bg-black flex flex-col items-center py-10 gap-10">
                      {profileOwnerPosts.map((post) => (
                        <Post key={post.id} post={post} />
                      ))}
                    </div>
                  ) : (
                    "No Posts!"
                  )}
                </div>
              )}
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
