// import mongoose from "mongoose";
import { getServerSession } from "next-auth";

import { authOptions } from "../../auth/[...nextauth]/options";

import dbConnect from "@/lib/db/dbConnect";
// import UserModel from "@/model/User";

export async function POST(request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  // const user = session.user;

  if (session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 401 }
    );
  }

  // const userId = new mongoose.Types.ObjectId(user._id);

  // const { acceptMessage } = await request.json();

  try {
    // TODO:
  } catch (error) {
    // TODO:
  }
}
