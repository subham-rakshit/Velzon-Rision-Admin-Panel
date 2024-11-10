import dbConnect from "@/lib/db/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { SignInSchema } from "@/schemas";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";
import FacebookProvider from "next-auth/providers/facebook";

export const authOptions = {
  providers: [
    // Credentials provider for email and password login
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
        rememberMe: { label: "Remember Me", type: "checkbox" },
      },
      async authorize(credentials) {
        const email = credentials.identifier;
        const password = credentials.password;
        const rememberMe = credentials.rememberMe;

        // Validate the credentials against the schema
        const validatedFields = SignInSchema.safeParse({
          email,
          password,
        });

        if (!validatedFields.success) {
          throw new Error("Invalid credentials filed");
        }

        await dbConnect();

        try {
          const dbUser = await UserModel.findOne({ email });
          if (!dbUser) {
            throw new Error("User not found");
          }

          if (!dbUser.isVerified) {
            throw new Error("Please verify your email address");
          }

          const isPasswordMatched = await bcrypt.compare(
            password,
            dbUser.password
          );
          if (!isPasswordMatched) {
            throw new Error("Password incorrect");
          }

          // Return user data along with rememberMe flag
          return { ...dbUser.toObject(), rememberMe };
        } catch (error) {
          throw new Error(error);
        }
      },
    }),

    // Google provider for OAuth authentication
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // Github provider for OAuth authentication
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    // Twitter provider for OAuth authentication
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
    }),

    // Facebook provider for OAuth authentication
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    // Handle the sign-in process, create new user if not found
    async signIn({ user, account, profile }) {
      await dbConnect();

      try {
        const dbUser = await UserModel.findOne({ email: user.email });

        if (!dbUser) {
          // Generate hashed password and create new user
          const generateNewHashedPassword = await bcrypt.hash(user.email, 12);
          const username = `${user.name
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "")}${Math.random().toString(36).slice(-4)}`;
          const isVerified =
            account.provider === "google" && profile.email_verified;

          const newUser = new UserModel({
            email: user.email,
            username,
            password: generateNewHashedPassword,
            isVerified,
            isAdmin: false,
          });

          await newUser.save();

          // Set user details in session
          user._id = newUser._id.toString();
          user.username = newUser.username;
          user.email = newUser.email;
          user.isVerified = newUser.isVerified;
          user.isAdmin = newUser.isAdmin;

          return true;
        }

        // Handle existing user verification check
        if (!dbUser.isVerified) {
          throw new Error("Please verify your email address");
        }

        // Set user details in session for existing users
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

    // Handle JWT token creation and update
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

    // Populate session with JWT token details
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.username = token.username;
        session.user.isVerified = token.isVerified;
        session.user.isAdmin = token.isAdmin;
      }

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  // Use JWT for session strategy
  session: {
    strategy: "jwt",
  },

  // Security key for encrypting JWT tokens
  secret: process.env.NEXTAUTH_SECRET,
};