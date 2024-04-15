"use client";

import { FaSearch, FaUser } from "react-icons/fa";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { DropdownMenuSeparator } from "../ui/dropdown-menu";
import { searchUsers } from "@/actions/search";
import { Button } from "../ui/button";
import FormError from "../form-error";
import { ClipLoader } from "react-spinners";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import Image from "next/image";
import Link from "next/link";
import { addFriend } from "@/actions/addFriend";
import { toast } from "sonner";

// TODO add search history using local storage

const Search = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");
  const [testing, setTesting] = useState([]);

  const user = useCurrentUser();

  const findUSers = async (e) => {
    e.preventDefault();

    if (!search) {
      setError("Enter a search term!");
      return;
    }
    try {
      setSearching(true);
      setError("");
      const users = await searchUsers(search, user.id);
      setResult(users);
      setSearched(true);
      //   console.log(users);
    } catch (error) {
      console.log(error);
    } finally {
      setSearching(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger>
        <span className="bg-destructive flex justify-center items-center p-2 rounded-full cursor-pointer">
          <FaSearch size={17} className="text-secondary-foreground" />
        </span>
      </SheetTrigger>
      <SheetContent className="z-[999]">
        <SheetHeader>
          <SheetTitle>Search for people and posts.</SheetTitle>
          <SheetDescription>
            <form onSubmit={findUSers}>
              <Input
                type="search"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button type="submit" disabled={searching} className="my-3">
                <span className="mr-2">Search</span>{" "}
                {searching && <ClipLoader color="red" size={20} />}
              </Button>
            </form>
            <FormError message={error} />
            <br />
            <DropdownMenuSeparator />
            <br />
            {searched && result && result.length > 0 && (
              <div>
                <h1 className="text-center text-xl underline mb-1">Results</h1>
                {result.map((resultUser) => (
                  <div
                    key={resultUser.id}
                    className="flex flex-col justify-center"
                  >
                    <div className="flex justify-between gap-2 items-center">
                      <Link href={`/profile/${resultUser.username}`}>
                        {resultUser.image ? (
                          <Image
                            src={resultUser.image}
                            width={70}
                            height={70}
                            alt={`${resultUser.firstname} ${resultUser.lastname}`}
                            className="rounded-full object-cover"
                          />
                        ) : (
                          <FaUser />
                        )}
                      </Link>
                      <div>
                        <Link href={`/profile/${resultUser.username}`}>
                          <h2 className="text-lg font-bold">{`${resultUser.firstname} ${resultUser.lastname}`}</h2>
                          <h3 className="text-md text-muted-foreground">
                            @{resultUser.username}
                          </h3>
                        </Link>
                        <div
                          className="flex justify-end items-center"
                          onClick={async () => {
                            if (!testing.includes(resultUser.username)) {
                              const result = await addFriend(
                                user.id,
                                resultUser.username
                              );
                              if (result.error) {
                                toast(result.error);
                              }
                              if (result.success) {
                                setTesting((prevState) => [
                                  ...prevState,
                                  resultUser.username,
                                ]);
                                toast(result.success);
                              }
                            }
                          }}
                        >
                          <Button
                            size="sm"
                            variant="secondary"
                            disabled={testing.includes(resultUser.username)}
                          >
                            <span className="mr-2">
                              {testing.includes(resultUser.username)
                                ? "Request Sent"
                                : "Add Friend"}
                            </span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {searched && result && result.length === 0 && (
              <div>No users found.</div>
            )}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Search;
