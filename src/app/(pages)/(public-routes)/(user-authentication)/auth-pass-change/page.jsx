import { titlesObject } from "@/app/assets/data/titlesData/titles";
import { globalStyleObj } from "@/app/assets/styles";
import { ResetPasswordForm } from "@/components";
import ROUTES from "@/constants/routes";
import Link from "next/link";

export const metadata = {
  title: titlesObject.authPassChange.title,
};

const ResetPassword = () => {
  return (
    <>
      <div className={`${globalStyleObj.formInnerContainer}`}>
        {/* Welcome Text */}
        <div className="mb-6">
          <h1 className={`${globalStyleObj.formHeading}`}>
            Create new password
          </h1>
          <p className={`${globalStyleObj.formDescription}`}>
            Your new password must be different from pervious used password.
          </p>
        </div>

        <ResetPasswordForm />
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

export default ResetPassword;
