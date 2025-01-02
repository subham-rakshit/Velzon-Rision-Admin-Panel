import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { titlesObject } from "@/app/assets/data/titlesData/titles";
import { globalStyleObj } from "@/app/assets/styles";
import {
  AddNewImageButton,
  Breadcrumb,
  ImageSearchBox,
  ImageSettingButton,
} from "@/components";
import { getAccessTokenData } from "@/lib/middleware/getAccessTokenData";
import { getAllImages } from "@/services/actions/image";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { BsEmojiAstonished } from "react-icons/bs";

export const metadata = {
  title: titlesObject.imageLibraryControls.title,
};

const ImageLibraryControls = async ({ searchParams }) => {
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
  // Get all images
  const { search } = await searchParams;
  let imagesList = [];
  const { success, images } = await getAllImages(userId, search || "");

  if (success) {
    imagesList = images;
  } else {
    imagesList = [];
  }

  return (
    <div className={`min-h-full`}>
      <Breadcrumb title="Library Controls" pageTilte="Image Console" />

      <div
        className={`${globalStyleObj.backgroundLight900Dark300} mt-[40px] min-h-full rounded-sm p-3 shadow-light sm:p-5`}
      >
        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <ImageSearchBox searchValue={search} />
          </div>

          <AddNewImageButton userId={userId} />
        </div>

        <ul className="my-5 flex min-h-[70vh] w-full flex-wrap gap-3 md:gap-5">
          {imagesList.length > 0 ? (
            imagesList.map((image) => (
              <li
                key={image._id}
                className="flex h-[220px] w-full max-w-[220px] flex-col overflow-hidden rounded-md shadow-lg transition-all duration-300 ease-in-out hover:translate-y-[-10px] hover:shadow-sm relative"
              >
                <div className={`w-full h-[130px]`}>
                  <Image
                    src={image.imageUrl}
                    alt={image.imageFileName}
                    width={100}
                    height={100}
                    priority={true}
                    style={{ width: "100%", height: "100%" }}
                    className="object-cover"
                  />
                </div>

                <div
                  className={`flex items-center bg-[#000]/20 px-2 py-2 h-[90px]`}
                >
                  <div>
                    <p className="font-poppins-md text-[13px] text-dark-weight-600 dark:text-light-weight-550 mb-1">
                      File Name :{" "}
                      <span className="font-poppins-rg text-dark-weight-400 dark:text-light-weight-400">
                        {image.imageFileName}
                      </span>
                    </p>

                    <p className="font-poppins-md text-[13px] text-dark-weight-600 dark:text-light-weight-550 mb-1">
                      Type :{" "}
                      <span className="font-poppins-rg text-dark-weight-400 dark:text-light-weight-400">
                        {image.imageType}
                      </span>
                    </p>

                    <p className="font-poppins-md text-[13px] text-dark-weight-600 dark:text-light-weight-550 mb-1">
                      Size :{" "}
                      <span className="font-poppins-rg text-dark-weight-400 dark:text-light-weight-400">
                        {image.minWidth} x {image.minHeight}
                      </span>
                    </p>
                  </div>
                </div>

                <ImageSettingButton userId={userId} imageId={image._id} />
              </li>
            ))
          ) : (
            <div className="flex w-full flex-col items-center justify-center gap-5 font-poppins-rg text-dark-weight-500 dark:text-light-weight-450">
              <BsEmojiAstonished size={80} />
              <h1 className="text-center text-[22px] text-dark-weight-600 dark:text-light-weight-800">
                No Images Uploaded Yet
              </h1>
              <p className="text-center text-[16px] italic text-dark-weight-350 dark:text-light-weight-400">
                Upload your first image to get started.
                <br /> Please click the Add New button.
              </p>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ImageLibraryControls;
