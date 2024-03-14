import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 className="text-4xl mb-3">Home Page</h1>
      <Link href="/login">Login</Link>
      <br />
      <hr />
      <Link href="/signup">SignUp</Link>
      <br />
      <hr />
      <Link href="/profile">Profile</Link>
    </>
  );
}
