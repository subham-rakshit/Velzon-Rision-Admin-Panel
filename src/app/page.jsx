import { Button } from "flowbite-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full min-h-[100vh] flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold">Home Page</h1>
      <Link href="/user/profile">
        <Button type="button" outline gradientDuoTone="purpleToBlue">
          Profile
        </Button>
      </Link>
    </div>
  );
}
