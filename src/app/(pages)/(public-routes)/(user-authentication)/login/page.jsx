import { titlesObject } from "@/app/assets/data/titlesData/titles";
import { globalStyleObj } from "@/app/assets/styles";
import { LoginForm, SocialAuthForm } from "@/components";
import ROUTES from "@/constants/routes";
import Link from "next/link";

// NOTE: Login Page meta data
export const metadata = {
  title: titlesObject.login.title,
};

const Login = () => {
  return (
    <>
      <div className={`${globalStyleObj.formInnerContainer}`}>
        {/* Welcome Text */}
        <div className="mb-6">
          <h1 className={`${globalStyleObj.formHeading}`}>Welcome Back !</h1>
          <p className={`${globalStyleObj.formDescription}`}>
            Sign in to continue to Velzon
          </p>
        </div>

        <LoginForm />

        <div className="my-5 flex items-center gap-2">
          <hr className="grow border-t border-dotted border-gray-300" />
          <span className={`${globalStyleObj.authDescriptionText}`}>
            Sign in with
          </span>
          <hr className="grow border-t border-dotted border-gray-300" />
        </div>
        {/* Alternate Sign in */}
        <SocialAuthForm />
      </div>
      {/* Sign Up */}
      <p className={`${globalStyleObj.authDescriptionText}`}>
        Don&apos;t have an account?{" "}
        <Link href={ROUTES.REGISTER}>
          <span className="text-[#405189] underline">Signup</span>
        </Link>
      </p>
    </>
  );
};

export default Login;
