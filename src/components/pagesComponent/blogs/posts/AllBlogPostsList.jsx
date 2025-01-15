"use client";

import { EachPostActions, PaginationComponent } from "@/components";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

const AllBlogPostsList = ({ userId, data, paginationDetails }) => {
  return (
    <>
      <div className="mx-3 mt-3 border rounded-sm dark:border-[#fff]/10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-poppins-md text-[11px] sm:text-[13px] text-dark-weight-600 dark:text-light-weight-800">
                Date
              </TableHead>
              <TableHead className="font-poppins-md text-[11px] sm:text-[13px] text-dark-weight-600 dark:text-light-weight-800">
                Banner
              </TableHead>
              <TableHead className="font-poppins-md text-[11px] sm:text-[13px] text-dark-weight-600 dark:text-light-weight-800">
                Title
              </TableHead>
              <TableHead className="font-poppins-md text-[11px] sm:text-[13px] text-dark-weight-600 dark:text-light-weight-800 hidden sm:table-cell">
                Category
              </TableHead>
              <TableHead className="font-poppins-md text-[11px] sm:text-[13px] text-dark-weight-600 dark:text-light-weight-800 text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="font-poppins-rg text-[11px] sm:text-[13px] text-dark-weight-400 dark:text-light-weight-450">
            {data.map((eachPost, index) => (
              <TableRow
                key={eachPost._id}
                className={`${index === data.length - 1 ? "border-0" : "border-b dark:border-[#fff]/10"}`}
              >
                {/* Date */}
                <TableCell
                  className={`font-poppins-md ${eachPost.isActive ? "" : "line-through opacity-50"}`}
                >
                  {new Date(eachPost.updatedAt).toLocaleDateString()}
                </TableCell>
                {/* Banner Image */}
                <TableCell>
                  <div
                    className={`w-[40px] h-[40px] sm:w-[100px] sm:h-[60px] rounded-full sm:rounded-md overflow-hidden relative ${eachPost.isActive ? "" : "opacity-50"}`}
                  >
                    <Image
                      src={eachPost.bannerImage}
                      alt={eachPost.title}
                      fill
                      sizes="150px"
                      priority
                      className="object-cover"
                    />
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
            ))}
          </TableBody>
        </Table>
      </div>

      {paginationDetails.totalPosts > paginationDetails.currentLimit && (
        <div className="mt-5 font-poppins-rg text-[13px] text-dark-weight-600 dark:text-light-weight-800">
          <PaginationComponent paginationDetails={paginationDetails} />
        </div>
      )}
    </>
  );
};

export default AllBlogPostsList;
