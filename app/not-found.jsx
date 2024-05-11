import Link from "next/link";
import style from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className="text-center p-3">
      <h1 className={`${style.not_found} text-[10rem] mb-3`}> 404</h1>
      <h2 className="text-2xl">Not Found</h2>
      <p className="italic">
        This may not mean anything. I&apos;m probably working on something that
        has blown up.
      </p>
      <button
        type="button"
        aria-label="go home"
        className="bg-blue-600 rounded-full hover:rounded-none px-4 py-2 transition-all duration-500 mt-5"
      >
        <Link href="/">Return Home</Link>
      </button>
    </div>
  );
}
