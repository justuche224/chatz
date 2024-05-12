import { getPost } from "@/actions/getPost";
import Post from "@/components/Post";
import FormError from "@/components/form-error";

const page = async ({ params }) => {
  const post = await getPost(params.postId);

  if (post.error || !post) {
    return (
      <div className="flex flex-col items-center w-full h-full">
        <div className="w-full max-w-xl h-full bg-black flex flex-col items-center py-10 gap-10">
          <FormError message={post.error || "Error getting post"} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-black flex flex-col items-center py-10 gap-10">
      <Post post={post} />
    </div>
  );
};

export default page;
