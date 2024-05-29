import { getPost } from "@/actions/getPost";
import Post from "@/components/Post";
import FormError from "@/components/form-error";
import CommentSection from "./_components/CommentSection";
import { getComments } from "@/actions/getComments";

const page = async ({ params }) => {
  const post = await getPost(params.postId);
  const comments = await getComments(params.postId);
  // console.log(post);
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
    <div className="w-full h-full bg-black flex flex-col items-center py-10 gap-10 mb-20 md:mb-0">
      <Post post={post} />
      <section className="mt-10">
        <CommentSection postId={params.postId} initialComments={comments} />
      </section>
    </div>
  );
};

export default page;
