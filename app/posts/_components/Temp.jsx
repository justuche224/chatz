"use client";

import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { ClipLoader } from "react-spinners";
import { SingleImageDropzone } from "@/components/upload/singleImage";
import { Button } from "@/components/ui/button";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { newPost } from "@/actions/newPost";
import { useRouter } from "next/navigation";
const NewPost = () => {
  const { edgestore } = useEdgeStore();
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [createPostModal, setCreatePostModal] = useState(false);
  const [postText, setPostText] = useState("");
  const router = useRouter();
  return (
    <>
      <div
        onClick={() => setCreatePostModal(true)}
        className="w-full flex items-center gap-5 mt-10 pl-5 py-2 rounded-full border cursor-pointer"
      >
        <div className="w-12 h-12 rounded-full bg-green-500"></div>
        <div>Share Something</div>
      </div>
      {createPostModal && (
        <div
          className="
            min-h-screen 
            w-full
            fixed 
            left-0 
            top-0 
            dark:bg-[#0000007e]
            bg-[#ffffff7e]
            z-[999] 
            flex 
            flex-col 
            justify-center 
            items-center 
            backdrop-blur-lg 
            gap-2
        "
        >
          <Button onClick={() => setCreatePostModal(false)}>Cancel</Button>
          <textarea
            rows="4"
            type="text"
            placeholder="Say something..."
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            className="block p-2.5 md:w-1/2 w-[300px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <SingleImageDropzone
            width={200}
            height={200}
            value={file}
            dropzoneOptions={{
              maxSize: 1024 * 1024 * 2,
            }}
            onChange={(file) => {
              setFile(file);
            }}
          />
          <div className="h-[6px] w-44 border rounded overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-150"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div>
            <Button
              disabled={!file && !postText}
              className="disabled:cursor-not-allowed"
              onClick={async () => {
                if (!file & !postText) {
                  setError("Please provide a post!");
                  return;
                }
                if (file) {
                  try {
                    setError("");
                    setLoading(true);
                    const res = await edgestore.chatz.upload({
                      file,
                      onProgressChange: (progress) => {
                        setProgress(progress);
                      },
                      input: { type: "post" },
                    });
                    if (res.url) {
                      const result = await newPost({
                        image: res.url,
                        content: postText,
                        user: user,
                      });
                      if (result.success) {
                        setSuccess(result.success);
                        setFile();
                        // window.location.reload();
                        router.push(`/posts/${post.id}`);
                      } else {
                        setError(result.error);
                      }
                    } else {
                      setError("something went wrong! try again later.");
                    }
                  } catch (error) {
                    setError("something went wrong! try again later.");
                    // console.log(error);
                  } finally {
                    setLoading(false);
                  }
                }
                try {
                  const result = await newPost({
                    content: postText,
                    user: user,
                  });
                } catch (error) {
                  if (result.success) {
                    setSuccess(result.success);
                    setFile();
                    // window.location.reload();
                    router.push(`/posts/${post.id}`);
                  } else {
                    setError(result.error);
                  }
                }
              }}
            >
              Post {loading && <ClipLoader color="blue" size={20} />}
            </Button>
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>
      )}
    </>
  );
};

export default NewPost;
