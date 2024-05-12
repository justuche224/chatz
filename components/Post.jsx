import { format } from "date-fns";
import {
  BookMarked,
  Ellipsis,
  Heart,
  MessageCircle,
  Share2,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function Post({ post }) {
  return (
    <div className="w-full max-w-xl flex flex-col py-3 gap-3 border">
      <div className="w-full flex justify-between items-center border-b py-3">
        <Link href={`/profile/${post.user.username}`}>
          <div className="flex gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              {post.user.image ? (
                <Image
                  src={post.user.image}
                  alt={post.user.username}
                  width={50}
                  height={50}
                  className="w-full h-full bg-cover"
                />
              ) : (
                <User size={50} />
              )}
            </div>
            <div>
              <h2>{post.user.firstname + " " + post.user.lastname}</h2>
              <h3>{format(new Date(post.createdAt), "p")}</h3>
            </div>
          </div>
        </Link>
        <div className="flex gap-3 items-center">
          <button>
            <Ellipsis />
          </button>
          <button>
            <X />
          </button>
        </div>
      </div>
      <Link href={`/posts/${post.id}`}>
        <div className="px-5 border-b py-3">
          {post.content}
          {post.image && (
            <div className="overflow-hidden">
              <Image
                className="w-full h-auto mt-3 hover:scale-125 duration-200 transition-all cursor-pointer"
                src={post.image}
                alt="post"
                width={500}
                height={500}
              />
            </div>
          )}
        </div>
      </Link>
      <div className="flex justify-between px-5">
        <button className="hover:scale-125 transition-all duration-100">
          <Heart />
        </button>
        <button className="hover:scale-125 transition-all duration-100">
          <MessageCircle />
        </button>
        <button className="hover:scale-125 transition-all duration-100">
          <Share2 />
        </button>
        <button className="hover:scale-125 transition-all duration-100">
          <BookMarked />
        </button>
      </div>
    </div>
  );
}

export default Post;
