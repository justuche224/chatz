import Link from "next/link";

export default async function RootLayout({ children }) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}
