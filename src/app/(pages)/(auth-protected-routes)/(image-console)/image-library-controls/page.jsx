import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { globalStyleObj } from "@/app/assets/styles";
import { titlesObject } from "@/app/assets/titlesData/titles";
import { AddNewImageButton, Breadcrumb, ImageSearchBox } from "@/components";
import { getAccessTokenData } from "@/lib/middleware/getAccessTokenData";
import { getServerSession } from "next-auth";

export const metadata = {
  title: titlesObject.imageLibraryControls.title,
};

const ImageLibraryControls = async () => {
  // OAuth Session user data
  const session = await getServerSession(authOptions);
  // JWT ACCESS_TOKEN user data
  const accessTokenData = await getAccessTokenData();
  // User ID
  const userId =
    session || accessTokenData
      ? session
        ? session.user._id
        : accessTokenData._id
      : null;

  return (
    <div className={`min-h-full`}>
      <Breadcrumb title="Library Controls" pageTilte="Image Console" />

      <div
        className={`${globalStyleObj.backgroundLight900Dark300} mt-[40px] min-h-full rounded-sm p-3 shadow-light sm:p-5`}
      >
        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <ImageSearchBox />
          </div>

          <AddNewImageButton userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default ImageLibraryControls;
