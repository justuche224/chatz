"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormError from "@/components/form-error";
import { ClipLoader } from "react-spinners";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { addFriend } from "@/actions/addFriend";
import { toast } from "sonner";
import { advancedSearchUsers } from "@/actions/advancedUserSearch";
import UserDetails from "@/components/utils/User";

// TODO add search history using local storage

const AdSearch = () => {
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
      const users = await advancedSearchUsers(search, user.id);
      setResult(users);
      console.log(result);
      setSearched(true);
      //   console.log(users);
    } catch (error) {
      console.log(error);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="z-[999] overflow-y-scroll">
      <h1 className="text-center">Search for people and posts.</h1>
      <form onSubmit={findUSers} className="flex flex-col justify-center px-5">
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
      {searched && result && (
        <div className="flex flex-col justify-center px-5">
          <h1 className="text-center text-xl underline mb-1">Results</h1>
          <div className="my-5">
            {result.friends.map((resultUser) => (
              <UserDetails key={resultUser.username} user={resultUser} />
            ))}
          </div>
          <div>
            {result.pending.map((resultUser) => (
              <UserDetails key={resultUser.username} user={resultUser}>
                <Button disabled>
                  <span className="mr-2">Pendinding request</span>
                </Button>
              </UserDetails>
            ))}
          </div>
          <div>
            {result.noFriendship.map((resultUser) => (
              <UserDetails key={resultUser.username} user={resultUser}>
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
                    disabled={testing.includes(resultUser.username)}
                  >
                    <span className="mr-2">
                      {testing.includes(resultUser.username)
                        ? "Request Sent"
                        : "Add Friend"}
                    </span>
                  </Button>
                </div>
              </UserDetails>
            ))}
          </div>
        </div>
      )}
      {searched && result && result.length === 0 && <div>No users found.</div>}
    </div>
  );
};

export default AdSearch;
