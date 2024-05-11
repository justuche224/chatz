"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { useEdgeStore } from "@/lib/edgestore";
import { SingleImageDropzone } from "./singleImage";
import { ClipLoader } from "react-spinners";
import { DialogFooter } from "../ui/dialog";
import { profilePicture } from "@/actions/profilePicture";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { useRouter } from "next/navigation";

export default function EdgeStore({ user }) {
  const { edgestore } = useEdgeStore();
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <div className="flex flex-col items-center m-6 gap-2">
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
      <DialogFooter>
        <Button
          disabled={!file}
          className="disabled:cursor-not-allowed"
          onClick={async () => {
            if (file) {
              try {
                setError("");
                setLoading(true);
                const res = await edgestore.chatz.upload({
                  file,
                  onProgressChange: (progress) => {
                    setProgress(progress);
                  },
                  input: { type: "profile" },
                });
                if (res.url) {
                  const result = await profilePicture(res, user);
                  if (result.success) {
                    setSuccess(result.success);
                    setFile();
                    window.location.reload();
                    // router.refresh()
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
          }}
        >
          Upload {loading && <ClipLoader color="blue" size={20} />}
        </Button>
      </DialogFooter>
      <FormError message={error} />
      <FormSuccess message={success} />
    </div>
  );
}
