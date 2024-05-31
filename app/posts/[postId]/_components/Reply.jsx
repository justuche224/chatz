import { format } from "date-fns";
import Image from "next/image";
import Comment from "./Comment";

function Reply({ reply, handleReplyClick }) {
  return (
    <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
            <Image
              width={30}
              height={30}
              className="mr-2 w-6 h-6 rounded-full"
              src={reply.user.image}
              alt={`${reply.user.firstname} ${reply.user.lastname}`}
            />
            {`${reply.user.firstname} ${reply.user.lastname}`}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <time dateTime={reply.createdAt}>
              {format(new Date(reply.createdAt), "h:mm a MMM d yyyy")}
            </time>
          </p>
        </div>
        {/* Dropdown for Edit, Remove, Report */}
        <div
          id="dropdownComment1"
          className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul
            className="py-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownMenuIconHorizontalButton"
          >
            <li>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Edit
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Remove
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Report
              </a>
            </li>
          </ul>
        </div>
      </footer>
      <p className="text-gray-500 dark:text-gray-400">{reply.content}</p>
      <div className="flex items-center mt-4 space-x-4">
        <button
          onClick={() => handleReplyClick(reply)}
          type="button"
          className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
        >
          <svg
            className="mr-1.5 w-3.5 h-3.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
            />
          </svg>
          Reply
        </button>
      </div>
      {reply.replies &&
        reply.replies.map((subReply) => (
          <Comment
            key={subReply.id}
            comment={subReply}
            handleReplyClick={handleReplyClick}
          />
        ))}
    </article>
  );
}

export default Reply;
