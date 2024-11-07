import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { SignInSchema } from "@/schemas";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter email",
        },
      },
      async authorize(credentials) {
        console.log(credentials); //TODO: REMOVE

        const email = credentials.identifier;
        const password = credentials.password;

        //NOTE: Validate the registration schema
        const validatedFields = SignInSchema.safeParse({
          email,
          password,
        });
        if (!validatedFields.success) {
          throw new Error("Invalid credentials filed");
        }

        await dbConnect();

        try {
          const user = await UserModel.findOne({ email });
          console.log(user); //TODO: REMOVE

          if (!user) {
            throw new Error("User not found");
          }

          if (!user.isVerified) {
            throw new Error("Please verify your email address");
          }

          const isPasswordMatched = await bcrypt.compare(
            password,
            user.password
          );

          if (!isPasswordMatched) {
            throw new Error("Password incorrect");
          } else {
            return user;
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      //NOTE: Connect database
      await dbConnect();

      try {
        //NOTE:: Find the user in db
        const dbUser = await UserModel.findOne({ email: user.email });

        if (!dbUser) {
          //INFO: Generate new hashed password (use email as a unique password)
          const generateNewHashedPassword = await bcrypt.hash(user.email, 12);

          //INFO: Create a unique username
          const username = `${user.name
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "")}${Math.random().toString(36).slice(-4)}`;

          //INFO: Email verification status
          const isVerified =
            account.provider === "google" && profile.email_verified;

          //INFO: Create a new user instance
          const newUser = new UserModel({
            email: user.email,
            username,
            password: generateNewHashedPassword,
            isVerified,
            isAdmin: false,
          });

          await newUser.save(); //INFO: Save the new User

          //INFO: Set user info in session
          user._id = newUser._id.toString();
          user.username = newUser.username;
          user.email = newUser.email;
          user.isVerified = newUser.isVerified;
          user.isAdmin = newUser.isAdmin;

          return true;
        }

        //INFO: Handle existing user verification check
        if (!dbUser.isVerified) {
          throw new Error("Please verify your email address");
        }

        //INFO: User data for session
        user._id = dbUser._id.toString();
        user.username = dbUser.username;
        user.email = dbUser.email;
        user.isVerified = dbUser.isVerified;
        user.isAdmin = dbUser.isAdmin;

        return true;
      } catch (error) {
        console.error("Error in signIn() callback:", error);
        throw new Error(error.message || "Login failed");
      }
    },
    async jwt({ token, user }) {
      if (user) {
        // Remove unnecessary properties from the token
        delete token.name;
        delete token.picture;
        delete token.sub;

        // Add user details to the token
        token._id = user._id.toString();
        token.username = user.username;
        token.isVerified = user.isVerified;
        token.isAdmin = user.isAdmin;
      }

      return token;
    },
    async session({ session, token }) {
      console.log(token);

      if (token) {
        session.user._id = token._id;
        session.user.username = token.username;
        session.user.isVerified = token.isVerified;
        session.user.isAdmin = token.isAdmin;
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
