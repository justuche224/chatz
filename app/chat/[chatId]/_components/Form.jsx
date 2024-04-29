"use client";

import useConversation from "@/hooks/useConversation";
import { useForm } from "react-hook-form";
import { HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { HiPaperAirplane } from "react-icons/hi2";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";

const Form = () => {
  const { chatId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = async (data) => {
    setValue("message", "", { shouldValidate: true });
    axios.post("/api/messages", {
      ...data,
      chatId,
    });
  };

  const handleUpload = (results) => {
    axios.post("/api/messages", {
      image: results.info.secure_url,
      chatId,
    });
  };

  return (
    <div className="py-4 px-4 bg-secondary  md:mb-0 mb-[58px] md:pr-20 lg:pr-0 border-t flex items-center gap-2 lg:gap-4 w-full">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onSuccess={(results) => {
          handleUpload(results);
        }}
        uploadPreset="rwyv2vso"
      >
        <HiPhoto size={30} className="text-destructive" />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Enter a message"
        />
        <button
          type="submit"
          className="rounded-full p-2 cursor-pointer bg-destructive"
        >
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
};

export default Form;
