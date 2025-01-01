import { titlesObject } from "@/app/assets/data/titlesData/titles";
import { globalStyleObj } from "@/app/assets/styles";
import { RegistrationForm, SocialAuthForm } from "@/components";
import ROUTES from "@/constants/routes";
import Link from "next/link";

export const metadata = {
  title: titlesObject.register.title,
  description: titlesObject.register.description,
};

const Register = () => {
  return (
    <>
      <div className={`${globalStyleObj.formInnerContainer}`}>
        {/* Create Text */}
        <div className="mb-6">
          <h1 className={`${globalStyleObj.formHeading}`}>
            Create New Account
          </h1>
          <p className={`${globalStyleObj.formDescription}`}>
            Get your free velzon account now
          </p>
        </div>

        {/* Registration Form */}
        <RegistrationForm />

        <div className="my-5 flex items-center gap-2">
          <hr className="grow border-t border-dotted border-gray-300" />
          <span className={`${globalStyleObj.authDescriptionText}`}>
            Create account with
          </span>
          <hr className="grow border-t border-dotted border-gray-300" />
        </div>
        {/* Alternate Sign in */}
        <SocialAuthForm />
      </div>
      {/* Sign Up */}
      <p className={`${globalStyleObj.authDescriptionText}`}>
        Already have an account?{" "}
        <Link href={ROUTES.LOGIN}>
          <span className="text-[#405189] underline">Signin</span>
        </Link>
      </p>
    </>
  );
};

export default Register;
