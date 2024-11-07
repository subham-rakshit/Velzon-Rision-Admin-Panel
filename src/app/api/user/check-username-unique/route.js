import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { usernameValidation } from "@/schemas/authSchemas/registrationSchema";
import { z } from "zod";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request) {
  await dbConnect();

  //NOTE: http://{{DOMAIN}}/api/user/check-username-unique?username=subham12
  try {
    const { searchParams } = new URL(request.url);

    const queryParams = {
      username: searchParams.get("username"),
    };

    // Validate with zod
    const validatedFields = UsernameQuerySchema.safeParse(queryParams); // { success: status, data: { username: '_VALUE_' } }

    if (!validatedFields.success) {
      const usernameErros = validatedFields.error.flatten().fieldErrors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameErros.length > 0
              ? usernameErros.join(",")
              : "Invalid query parameters",
        },
        { status: 400 }
      );
    }

    const { username } = validatedFields.data;

    const existingVerifiedUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUsername) {
      return Response.json(
        {
          success: false,
          message: "Username already taken",
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Username is available",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking username", error);
    return Response.json(
      {
        success: false,
        message: "Error checking username",
      },
      { status: 500 }
    );
  }
}
