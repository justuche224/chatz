import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function RootLayout({ children }) {
  return (
    <>
      <nav className="center gap-3 px-5 my-2">
        <div>
          <Button>
            <Link href="/friends">Friends</Link>
          </Button>
        </div>
        <div>
          <Button>
            <Link href="/friends/requests">Recieved Requests</Link>
          </Button>
        </div>
        <div>
          <Button>
            <Link href="/friends/requests/sent">Sent Requests</Link>
          </Button>
        </div>
      </nav>
      <main>{children}</main>
    </>
  );
}
