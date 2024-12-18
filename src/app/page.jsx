import { Button } from "flowbite-react";
import Link from "next/link";

const Home = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold">Home Page</h1>
      <Link href="/profile">
        <Button type="button" outline gradientDuoTone="purpleToBlue">
          Profile
        </Button>
      </Link>
    </div>
  );
};

export default Home;
