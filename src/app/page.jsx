"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  //NOTE: When ever user wants to come in home page they are redirecting to /login page if they not authenticated.
  //TODO: Authentication Work -----
  useEffect(() => {
    router.push("/login");
  }, [router]);

  return (
    <div className="w-full min-h-[100vh] flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold">Home Page</h1>
    </div>
  );
}
