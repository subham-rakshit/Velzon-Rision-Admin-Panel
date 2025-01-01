import { titlesObject } from "@/app/assets/data/titlesData/titles";
import { globalStyleObj } from "@/app/assets/styles";
import { PlayerLordIcon, ResendOtpForm } from "@/components";
import ROUTES from "@/constants/routes";
import Link from "next/link";

export const metadata = {
  title: titlesObject.authOtpResend.title,
};

const ResendOtp = () => {
  return (
    <>
      <div className={`${globalStyleObj.formInnerContainer}`}>
        {/* Welcome Text */}
        <div className="mb-6 flex flex-col items-center">
          <h1 className={`${globalStyleObj.formHeading}`}>Resend OTP?</h1>
          <p className={`${globalStyleObj.formDescription}`}>
            Resend otp with velzon
          </p>

          <PlayerLordIcon />

          <div className="mt-4 w-full rounded bg-[#FEF4E4] p-3 shadow-light">
            <p className="text-center font-poppins-md text-[13px] text-[#d29c40]">
              Enter your email and otp will be sent to you!
            </p>
          </div>
        </div>

        {/* Form Element */}
        <ResendOtpForm />
      </div>

      <p className={`${globalStyleObj.authDescriptionText}`}>
        Hold on, I just received my code...{" "}
        <Link href={ROUTES.AUTH_TWO_STEP}>
          <span className="text-[#405189] underline">Click here</span>
        </Link>
      </p>
    </>
  );
};

export default ResendOtp;
