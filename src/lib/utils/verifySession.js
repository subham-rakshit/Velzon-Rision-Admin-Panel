import "server-only";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { cache } from "react";
import { getAccessTokenData } from "./getAccessTokenData";

export const verifySession = cache(async () => {
  try {
    // Fetch session and access token data concurrently
    const [session, accessTokenData] = await Promise.all([
      getServerSession(authOptions),
      getAccessTokenData(),
    ]);

    const user = session?.user || accessTokenData;

    if (!user) {
      return {
        isAuth: false,
        userId: "",
      };
    }

    return {
      isAuth: true,
      userId: user._id,
    };
  } catch (error) {
    console.error("Error verifying session:", error);
    return {
      isAuth: false,
      userId: "",
    };
  }
});
