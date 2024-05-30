"use client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import axios from "axios";
import { format } from "date-fns";
import Image from "next/image";
import { useState, useRef } from "react";
import { HiPaperAirplane } from "react-icons/hi2";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import Comment from "./Comment";

function CommentSection({ postId, initialComments }) {
  const [comments, setComments] = useState(initialComments);
  const [comment, setComment] = useState("");
  const [replyTo, setReplyTo] = useState("");
  const [commenting, setCommenting] = useState(false);
  const [error, setError] = useState("");
  const user = useCurrentUser();
  const inputRef = useRef(null);

  const handleReplyClick = (comment) => {
    setReplyTo(comment);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const postComment = async (e) => {
    e.preventDefault();

    if (!comment) {
      toast("Enter a comment!");
      return;
    }

    if (replyTo) {
      try {
        setCommenting(true);
        setError("");
        const response = await axios.post("/api/posts/comment", {
          content: comment,
          userId: user.id,
          postId: postId,
          parentId: replyTo.id,
        });
        toast.success(response.data.message);
        // console.log(response.data.newComment);
        setComment("");
        setReplyTo("");
      } catch (error) {
        toast.error("Failed to add reply!");
      } finally {
        setCommenting(false);
      }
      return;
    }

    try {
      setCommenting(true);
      setError("");
      const response = await axios.post("/api/posts/comment", {
        content: comment,
        userId: user.id,
        postId: postId,
      });
      toast.success(response.data.message);
      //   console.log(response.data.newComment);
      setComment("");
    } catch (error) {
      toast.error("Failed to add comment!");
    } finally {
      setCommenting(false);
    }
  };

  return (
    <section className="w-full py-8 lg:py-16 antialiased mb-20">
      {/* comment input */}
      <form
        onSubmit={postComment}
        className="w-full fixed bottom-0 pb-[60px] md:pb-[10px] bg-white dark:bg-black text-black dark:text-white "
      >
        {replyTo ? (
          <div className="flex gap-5 text-2xl pl-10">
            <span>
              replying to:{" "}
              <span className="font-bold">
                {replyTo?.user?.firstname + " " + replyTo?.user?.lastname}
              </span>
            </span>
            <button
              className="italic text-destructive"
              onClick={() => setReplyTo(null)}
            >
              cancel
            </button>
          </div>
        ) : null}
        <div className="w-full flex justify-center gap-5 ">
          <input
            ref={inputRef}
            className="w-[80%] py-2 px-4 bg-neutral-300 text-black rounded-full focus:outline-none"
            type="text"
            placeholder="Write a comment..."
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            required
          />
          <button
            disabled={commenting}
            type="submit"
            className="rounded-full p-2 cursor-pointer bg-destructive"
          >
            {commenting ? (
              <ClipLoader color="blue" size={20} />
            ) : (
              <HiPaperAirplane size={18} className="text-white" />
            )}
          </button>
        </div>
      </form>
      {/* comment input ends */}
      <div className="w-full mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Discussion ({comments.length})
          </h2>
        </div>
        {comments?.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            handleReplyClick={handleReplyClick}
          />
        ))}
      </div>
    </section>
  );
}

export default CommentSection;
