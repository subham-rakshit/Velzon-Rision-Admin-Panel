import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const getAccessTokenData = async () => {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("access-token");

  // If the access token is not available, return null
  if (!accessToken) {
    return null;
  }

  const tokenValue = accessToken.value;
  try {
    const userData = jwt.verify(tokenValue, process.env.TOKEN_SECRET);
    return userData;
  } catch (error) {
    console.log(`Error in getting access token data: ${error}`);
    return null;
  }
};
