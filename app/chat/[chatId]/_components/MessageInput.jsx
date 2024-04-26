"use ckient";

const MessageInput = ({ placeholder, id, required, register, errors }) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
        className="py-2 px-4 bg-neutral-300 text-black w-full rounded-full focus:outline-none"
      />
    </div>
  );
};

export default MessageInput;
