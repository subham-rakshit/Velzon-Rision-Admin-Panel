"use client";

import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, [router]);

  return (
    <div>
      <h1>Home Page</h1>
      <Button color="blue">Click Me</Button>
    </div>
  );
}
