"use client";

import { PaginationComponent, PostDeleteButton } from "@/components";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";
import { RiEditBoxLine } from "react-icons/ri";

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
                Options
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="font-poppins-rg text-[11px] sm:text-[13px] text-dark-weight-400 dark:text-light-weight-450">
            {data.map((eachPost, index) => (
              <TableRow
                key={eachPost._id}
                className={`${index === data.length - 1 ? "border-0" : "border-b dark:border-[#fff]/10"}`}
              >
                <TableCell className="font-poppins-md">
                  {new Date(eachPost.updatedAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="w-[40px] h-[40px] sm:w-[100px] sm:h-[60px] rounded-full sm:rounded-md overflow-hidden relative">
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
                <TableCell>
                  {eachPost.title.length > 25
                    ? eachPost.title.slice(0, 20) + "..."
                    : eachPost.title}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {eachPost.category?.name || "No Category"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/blogs/posts/update/${eachPost._id}`}
                      className="transition-300 rounded-full bg-[#49ABE0]/20 p-2 text-[#49ABE0] hover:bg-[#49ABE0] hover:text-white"
                    >
                      <RiEditBoxLine size={12} />
                    </Link>

                    <PostDeleteButton userId={userId} postId={eachPost._id} />
                  </div>
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
