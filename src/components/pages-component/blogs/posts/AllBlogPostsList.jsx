"use client";

import {
  EachPostActions,
  PaginationComponent,
  SVGBannerImage,
} from "@/components";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatISODate } from "@/lib/utils/fomateDate";
import Image from "next/image";

const AllBlogPostsList = ({ userId, data, paginationDetails, search }) => {
  return (
    <>
      <div className="mx-3 mt-3 border rounded-sm dark:border-[#fff]/10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-poppins-md text-[11px] sm:text-[13px] text-dark-weight-600 dark:text-light-weight-800 hidden sm:table-cell">
                #
              </TableHead>
              <TableHead className="font-poppins-md text-[11px] sm:text-[13px] text-dark-weight-600 dark:text-light-weight-800 hidden sm:table-cell">
                Date
              </TableHead>
              <TableHead className="font-poppins-md text-[11px] sm:text-[13px] text-dark-weight-600 dark:text-light-weight-800">
                Banner
              </TableHead>
              <TableHead className="font-poppins-md text-[11px] sm:text-[13px] text-dark-weight-600 dark:text-light-weight-800">
                Title
              </TableHead>
              <TableHead className="font-poppins-md text-[11px] sm:text-[13px] text-dark-weight-600 dark:text-light-weight-800">
                Category
              </TableHead>
              <TableHead className="font-poppins-md text-[11px] sm:text-[13px] text-dark-weight-600 dark:text-light-weight-800 text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="font-poppins-rg text-[11px] sm:text-[13px] text-dark-weight-400 dark:text-light-weight-450">
            {data.map((eachPost, index) => {
              const serialNumber =
                parseInt(paginationDetails.currentLimit) *
                  (parseInt(paginationDetails.currentPage) - 1) +
                index +
                1;

              return (
                <TableRow
                  key={eachPost._id}
                  className={`${index === data.length - 1 ? "border-0" : "border-b dark:border-[#fff]/10"}`}
                >
                  {/* Serial Number */}
                  <TableCell className={`font-poppins-md`}>
                    {serialNumber}
                  </TableCell>
                  {/* Date */}
                  <TableCell
                    className={`font-poppins-md ${eachPost.isActive ? "" : "line-through opacity-50"} hidden sm:table-cell`}
                  >
                    {formatISODate(eachPost.updatedAt)}
                  </TableCell>
                  {/* Banner Image */}
                  <TableCell>
                    <div
                      className={`w-[40px] h-[40px] sm:w-[100px] sm:h-[60px] rounded-full sm:rounded-md overflow-hidden relative ${eachPost.isActive ? "" : "opacity-50"} border dark:border-[#fff]/10`}
                    >
                      {eachPost.bannerImage.fileType.startsWith(
                        "image/svg+xml"
                      ) ? (
                        <SVGBannerImage
                          bannerUrl={eachPost.bannerImage.fileUrl}
                        />
                      ) : (
                        <Image
                          src={eachPost.bannerImage.fileUrl}
                          alt={eachPost.bannerImage.fileName}
                          fill
                          sizes="(max-width: 576px) 100px, 150px"
                          loading="lazy"
                          className="object-cover"
                        />
                      )}
                    </div>
                  </TableCell>
                  {/* Title */}
                  <TableCell
                    className={`${eachPost.isActive ? "" : "line-through opacity-50"}`}
                  >
                    {eachPost.title.length > 25
                      ? eachPost.title.slice(0, 20) + "..."
                      : eachPost.title}
                  </TableCell>
                  {/* Category */}
                  <TableCell
                    className={`${eachPost.isActive ? "" : "line-through opacity-50"}`}
                  >
                    {eachPost.category?.name || "No Category"}
                  </TableCell>
                  {/* Actions */}
                  <TableCell className="text-right">
                    <EachPostActions userId={userId} postDetails={eachPost} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div className="mt-5 px-3 flex items-center gap-2">
        <PaginationComponent
          paginationDetails={paginationDetails}
          search={search}
        />
      </div>
    </>
  );
};

export default AllBlogPostsList;
