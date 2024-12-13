import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

import handleResponse from "./responseMiddleware";

export const validateUserFromToken = async () => {
  // INFO: Extract token from request cookies
  try {
    const cookieStore = await cookies();
    const normalToken = cookieStore.get("access-token");
    const nextAuthToken = cookieStore.get("next-auth.session-token");

    // console.log("Normal Token: ", normalToken);
    // console.log("NextAuth Token: ", nextAuthToken);

    if (!normalToken && !nextAuthToken) {
      return handleResponse({
        res: Response,
        status: 401,
        success: false,
        message: "User unauthorized!",
      });
    }

    const tokenToVerify = normalToken ? normalToken.value : nextAuthToken.value;

    return new Promise((resolve, reject) => {
      jwt.verify(tokenToVerify, process.env.TOKEN_SECRET, (err, tokenData) => {
        if (err) {
          const response = handleResponse({
            res: Response,
            status: 401,
            success: false,
            message: "User unauthorized!",
          });
          reject(response);
        } else {
          resolve(tokenData);
        }
      });
    });
  } catch (error) {
    console.log(`Data extracting error from token: ${error.message}`);
    return handleResponse({
      res: Response,
      status: 200,
      success: true,
      message: "Backend Error",
    });
  }
};
