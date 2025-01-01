import { titlesObject } from "@/app/assets/data/titlesData/titles";
import { globalStyleObj } from "@/app/assets/styles";
import { ForgotPasswordForm, PlayerLordIcon } from "@/components";
import ROUTES from "@/constants/routes";
import Link from "next/link";

export const metadata = {
  title: titlesObject.forgotPassword.title,
};

const ForgetPasswordPage = () => {
  return (
    <>
      <div className={`${globalStyleObj.formInnerContainer}`}>
        {/* Welcome Text */}
        <div className="mb-6 flex flex-col items-center">
          <h1 className={`${globalStyleObj.formHeading}`}>Forgot Password?</h1>
          <p className={`${globalStyleObj.formDescription}`}>
            Reset password with velzon
          </p>

          <PlayerLordIcon />
        </div>

        <ForgotPasswordForm />
      </div>

      {/* Sign In */}
      <p className={`${globalStyleObj.authDescriptionText}`}>
        Wait, I remember my password...{" "}
        <Link href={ROUTES.LOGIN}>
          <span className="text-[#405189] underline">Click here</span>
        </Link>
      </p>
    </>
  );
};

export default ForgetPasswordPage;
