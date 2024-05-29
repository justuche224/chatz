"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
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
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { toast } from "sonner";
import { pusherClient } from "@/lib/pusher";
import { findIndex } from "lodash";

function Post({ post }) {
  const user = useCurrentUser();
  const [likes, setLikes] = useState(post.likes);
  const [liking, setLiking] = useState(false);

  const likesCount = likes?.length;
  const likedByCurrentUser = likes?.some((like) => like?.userId === user.id);

  const likePost = async () => {
    try {
      setLiking(true);
      const response = await axios.post("/api/posts/like", {
        postId: post.id,
      });
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Unable to like post!");
    } finally {
      setLiking(false);
    }
  };

  const handleNewLike = useCallback(
    (newLike) => {
      if (newLike.postId === post.id) {
        setLikes((current) => [...current, newLike]);
      }
    },
    [post.id]
  );

  const handleRemovedLike = useCallback(
    (removedLike) => {
      if (removedLike.postId === post.id) {
        setLikes((current) => {
          const index = findIndex(current, { id: removedLike.id });
          if (index !== -1) {
            const updatedLikes = [...current];
            updatedLikes.splice(index, 1);
            return updatedLikes;
          }
          return current;
        });
      }
    },
    [post.id]
  );

  useEffect(() => {
    if (!post.id) return;

    pusherClient.subscribe(post.id);
    pusherClient.bind("likes:new", handleNewLike);
    pusherClient.bind("likes:removed", handleRemovedLike);

    return () => {
      pusherClient.unsubscribe(post.id);
      pusherClient.unbind("likes:new", handleNewLike);
      pusherClient.unbind("likes:removed", handleRemovedLike);
    };
  }, [post.id, handleNewLike, handleRemovedLike]);

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
              <h3>{format(new Date(post.createdAt), "p PP")}</h3>
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
        <button
          onClick={likePost}
          disabled={liking}
          className="hover:scale-125 transition-all duration-100 flex gap-2"
        >
          <span>{likesCount}</span>
          <Heart className={likedByCurrentUser ? "text-red-500" : ""} />
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
