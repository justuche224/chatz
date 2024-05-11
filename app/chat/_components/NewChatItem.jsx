"use client";

import StartChat from "./StartChat";

const NewChatItem = ({ id, firstname, lastname, username, image, setOpen }) => {
  return (
    <div className="flex gap-2 bg-[#f7f5f5] dark:bg-[#2c2c2c] p-4 justify-between items-center">
      <div className="flex gap-4">
        <div className="w-11 h-11 bg-blue-400 rounded-full"></div>
        <div>
          <h1 className="font-bold text-xl">{firstname + " " + lastname}</h1>
          <p>last message</p>
        </div>
        <div>
          <StartChat id={id} setOpen={setOpen} />
        </div>
      </div>
    </div>
  );
};

export default NewChatItem;
