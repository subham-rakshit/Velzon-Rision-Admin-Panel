import jwt from "jsonwebtoken"
import { cookies } from "next/headers";

import handleResponse from "@/lib/middleware/responseMiddleware";

export async function GET(request) {
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
   }
   const userData = jwt.verify(token.value, process.env.TOKEN_SECRET);
    
    if (!userData) {
     return handleResponse({
      res: Response,
      status: 400,
      success: false,
      message: "Need to Login",
    });
    } else {
     return handleResponse({
      res: Response,
      status: 200,
      success: true,
      message: userData.username,
    });
    } 
  } catch (error) {
    console.log("Get user details Error: ", error);
    return handleResponse({
      res: Response,
      status: 500,
      success: false,
      message: "User Details BackEnd Error",
    })
  }
}