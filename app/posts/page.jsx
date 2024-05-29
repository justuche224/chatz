import NewPost from "./_components/NewPost";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { getPosts } from "@/actions/getPosts";
import FormError from "@/components/form-error";
import Post from "@/components/Post";

const Page = async () => {
  const posts = await getPosts();
  if (!posts) {
    return (
      <div className="flex flex-col items-center w-full h-full">
        <div className="w-full max-w-xl h-full bg-black flex flex-col items-center py-10 gap-10">
          <FormError message="Error getting posts!" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full h-full pb-16">
      <div className="w-full max-w-xl">
        <EdgeStoreProvider>
          <NewPost />
        </EdgeStoreProvider>
      </div>
      <div className="w-full max-w-xl h-full bg-black flex flex-col items-center py-10 gap-10 mb-20 md:mb-0">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Page;
