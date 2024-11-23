import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

import handleResponse from "./responseMiddleware";

export const validateUserFromToken = async (request) => {
  // INFO: Extract token from request cookies
  try { 
    const cookieStore = await cookies()
    
    const token = cookieStore.get("access-token")

    if (!token) {
      return handleResponse({
        res: Response,
        status: 401,
        success: false,
        message: "User unauthorized!",
      })
    } else {
      jwt.verify(token.value, process.env.TOKEN_SECRET, (err, tokenData) => {
        if (err) {
          return handleResponse({
            res: Response,
            status: 401,
            success: false,
            message: "User unauthorized!"
          })
        } else {
          return tokenData
        }
      })
    }
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
