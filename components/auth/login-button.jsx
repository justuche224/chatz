"use client";

import { useRouter } from "next/navigation";

const LoginButton = ({ children, mode = "redirect", asChild }) => {
  const router = useRouter();
  const onClick = () => {
    router.push("/auth/login");
  };
  return (
    <span
      onClick={onClick}
      className="cursor-pointer flex justify-center items-center"
    >
      {children}
    </span>
  );
};

export default LoginButton;
