import { globalStyleObj } from "@/app/assets/styles";
import {
  Breadcrumb,
  FileGallery,
  FileTypeFilterDropdown,
  SearchByFileName,
  UploadFiles,
} from "@/components";
import { verifySession } from "@/lib/utils/verifySession";

const FileLists = async ({ searchParams }) => {
  const { userId } = await verifySession();

  const { search, page, pageSize, selectedFileType } = await searchParams;

  let pageNumber = 1;
  let pageSizeNumber = 10;

  // Handle page parameter
  if (page) {
    const parsedPage = parseInt(page, 10);
    if (!isNaN(parsedPage) && parsedPage > 0) {
      pageNumber = parsedPage;
    } else {
      // Redirect to page 1 if an invalid page number is provided
      redirect("/admin/file/lists?page=1");
    }
  }

  if (pageSize) {
    const parsedPageSize = parseInt(pageSize, 10);
    if (!isNaN(parsedPageSize) && parsedPageSize > 0) {
      pageSizeNumber = parsedPageSize;
    } else {
      // Redirect to page 1 if an invalid page size is provided
      redirect("/admin/file/lists?pageSize=10");
    }
  }

  return (
    <div className={`min-h-full`}>
      <Breadcrumb title="File Lists" pageTilte="Files Console" />

      <div
        className={`mt-[40px] ${globalStyleObj.backgroundLight900Dark300} rounded-sm p-3 shadow-light sm:p-5`}
      >
        <div className="flex justify-between pt-1">
          <div className="flex items-center gap-2">
            <SearchByFileName />
            <FileTypeFilterDropdown selectedFileType={selectedFileType} />
          </div>

          <UploadFiles />
        </div>
        <div className="overflow-hidden mt-5">
          <FileGallery
            userId={userId}
            page={pageNumber}
            pageSize={pageSizeNumber}
            selectedFileType={selectedFileType}
            search={search}
          />
        </div>
      </div>
    </div>
  );
};

export default FileLists;
