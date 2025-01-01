import { titlesObject } from "@/app/assets/data/titlesData/titles";
import { globalStyleObj } from "@/app/assets/styles";
import { VerifyAccount } from "@/components";
import ROUTES from "@/constants/routes";
import Link from "next/link";
import { AiOutlineMail } from "react-icons/ai";

export const metadata = {
  title: titlesObject.authTwoStep.title,
};

const VerifyEmailAccount = () => {
  return (
    <>
      <div className={`${globalStyleObj.formInnerContainer}`}>
        <div className="flex flex-col items-center justify-center gap-5">
          <div className="rounded-full bg-[#F3F6F9] p-5">
            <AiOutlineMail color="#405189" size="65" />
          </div>

          <div>
            <h1 className={`${globalStyleObj.formHeading}`}>
              Verify Your Email
            </h1>
            <p className={`${globalStyleObj.formDescription}`}>
              Please click the below button to proceed
            </p>
            <p className="text-center font-poppins-sb text-[13px] text-light-weight-400">
              example@abc.com
            </p>
          </div>

          <VerifyAccount />
        </div>
      </div>

      <div className="flex items-center justify-between w-full max-w-[420px]">
        <p className={`${globalStyleObj.authDescriptionText}`}>
          Didn&apos;t receive a code ?{" "}
          <Link href={ROUTES.AUTH_OTP_RESEND}>
            <span className="text-[#405189] underline">Resend</span>
          </Link>
        </p>

        <p className={`${globalStyleObj.authDescriptionText}`}>
          Move to{" "}
          <Link href={ROUTES.LOGIN}>
            <span className="text-[#405189] underline">Sign in</span>
          </Link>
        </p>
      </div>
    </>
  );
};

export default VerifyEmailAccount;
