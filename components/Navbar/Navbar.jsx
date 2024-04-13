import Image from "next/image";
import {
  FaBars,
  FaBell,
  FaFacebookMessenger,
  FaPlus,
  FaSearch,
} from "react-icons/fa";
import { UserButton } from "../auth/UserButton";

const Navbar = () => {
  return (
    <nav
      aria-label="Navigation bar"
      className="w-full bg-secondary h-11 flex items-center justify-between px-3 fixed top-0"
    >
      <div className="flex items-center justify-between gap-2">
        <Image
          src="/images/chatz.svg"
          width={35}
          height={35}
          priority
          alt="logo"
        />
        <span className="bg-destructive flex justify-center items-center p-2 rounded-full">
          <FaSearch size={17} className="text-secondary-foreground" />
        </span>
        <span>
          <FaBars size={28} className="text-secondary-foreground" />
        </span>
      </div>
      <div></div>
      <div className="flex items-center justify-between gap-2">
        <span className="bg-destructive flex justify-center items-center p-2 rounded-full">
          <FaPlus size={17} className="text-secondary-foreground" />
        </span>
        <span className="bg-destructive flex justify-center items-center p-2 rounded-full">
          <FaFacebookMessenger
            size={17}
            className="text-secondary-foreground"
          />
        </span>
        <span className="bg-destructive flex justify-center items-center p-2 rounded-full">
          <FaBell size={17} className="text-secondary-foreground" />
        </span>
        <UserButton />
      </div>
    </nav>
  );
};

export default Navbar;
