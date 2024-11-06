import jwt from "jsonwebtoken";

export const validateUserFromToken = (request) => {
  //INFO: Extract token from request cookies
  try {
    const cookiesToken = request.cookies.get("token")?.value || "";

    // Decode the token
    const decodedToken = jwt.verify(cookiesToken, process.env.TOKEN_SECRET);
    console.log(decodedToken);

    return decodedToken.userId;
  } catch (error) {
    console.log(`Data extracting error from token: ${error.message}`);
    throw new Error(error.message);
  }
};
