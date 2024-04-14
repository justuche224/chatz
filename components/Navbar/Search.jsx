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

// TODO add search history using local storage

const Search = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");

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
                {result.map((user) => (
                  <div key={user.id} className="flex justify-between">
                    <Link href={`/profile/${user.username}`}>
                      <div className="flex justify-between gap-2 items-center">
                        {user.image ? (
                          <Image
                            src={user.image}
                            width={70}
                            height={70}
                            alt={`${user.firstname} ${user.lastname}`}
                            className="rounded-full"
                          />
                        ) : (
                          <FaUser />
                        )}
                        <div>
                          <h2 className="text-lg font-bold">{`${user.firstname} ${user.lastname}`}</h2>
                          <h3 className="text-md text-muted-foreground">
                            @{user.username}
                          </h3>
                        </div>
                      </div>
                    </Link>
                    <div className="flex justify-end items-center">
                      <Button size="sm" variant="secondary">
                        Add friend
                      </Button>
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
