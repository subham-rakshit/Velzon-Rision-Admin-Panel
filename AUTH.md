// import { SignJWT, jwtVerify } from "jose";
// import { cookies } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";

// const secretKey = "secret";
// const key = new TextEncoder().encode(secretKey);

// export async function encrypt(payload: any) {
// return await new SignJWT(payload)
// .setProtectedHeader({ alg: "HS256" })
// .setIssuedAt()
// .setExpirationTime("10 sec from now")
// .sign(key);
// }

// export async function decrypt(input: string): Promise<any> {
// const { payload } = await jwtVerify(input, key, {
// algorithms: ["HS256"],
// });
// return payload;
// }

// export async function login(formData: FormData) {
// // Verify credentials && get the user

// const user = { email: formData.get("email"), name: "John" };

// // Create the session
// const expires = new Date(Date.now() + 10 \* 1000);
// const session = await encrypt({ user, expires });

// // Save the session in a cookie
// cookies().set("session", session, { expires, httpOnly: true });
// }

// export async function logout() {
// // Destroy the session
// cookies().set("session", "", { expires: new Date(0) });
// }

// export async function getSession() {
// const session = cookies().get("session")?.value;
// if (!session) return null;
// return await decrypt(session);
// }

// export async function updateSession(request: NextRequest) {
// const session = request.cookies.get("session")?.value;
// if (!session) return;

// // Refresh the session so it doesn't expire
// const parsed = await decrypt(session);
// parsed.expires = new Date(Date.now() + 10 \* 1000);
// const res = NextResponse.next();
// res.cookies.set({
// name: "session",
// value: await encrypt(parsed),
// httpOnly: true,
// expires: parsed.expires,
// });
// return res;
// }

# Logout UI part

<!-- "use client";

import { Button } from "flowbite-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    if (session) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/logout`
        );

        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    } else {
      router.replace("/login");
    }
  };
  return (
    <div className="w-full min-h-[100vh] flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold">Home Page</h1>
      <Button
        type="button"
        onClick={handleLogout}
        outline
        gradientDuoTone="purpleToBlue"
      >
        {session ? "Logout" : "Login"}
      </Button>
    </div>
  );
} -->

# API part

<!-- import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
await dbConnect(); //INFO: Database connection

try {
const response = NextResponse.json(
{
success: true,
message: `Logout successfully`,
},
{ status: 200 }
);

    response.cookies.set("next-auth.session-token", "", {
      httpOnly: true,
      expiresIn: new Date(-1), // delete cookies imediately
      path: "/",
    });

    return response;

} catch (error) {
console.error(`Error logining out user: ${error}`);
return NextResponse.json(
{
success: false,
message: `Error logining out user: ${error.message}`,
},
{ status: 500 }
);
}
} -->

# Login From NextAuth

<!-- async function handleFromSubmit(event) {
// event.preventDefault();

// try {
// setIsProcessing(true);

// const result = await signIn("credentials", {
// redirect: "/dashboard",
// identifier: loginData.email,
// password: loginData.password,
// rememberMe: loginData.rememberMe,
// });

// if (result.error || !result.ok) {
// setIsProcessing(false);

// toast.error(result.error, {
// position: "top-right",
// autoClose: 3000,
// hideProgressBar: false,
// closeOnClick: true,
// pauseOnHover: true,
// draggable: true,
// progress: undefined,
// theme: "light",
// });
// } else {
// toast.success("Login Successful", {
// position: "top-right",
// autoClose: 3000,
// hideProgressBar: false,
// closeOnClick: true,
// pauseOnHover: true,
// draggable: true,
// progress: undefined,
// theme: "light",
// });

// setIsProcessing(false);
// setLoginData({ rememberMe: false });

// // router.redirect("/dashboard"); // Redirect to Home Page
// }
// } catch (error) {
// console.log(error);
// }
// } -->
