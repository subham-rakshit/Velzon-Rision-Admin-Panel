import { globalStyleObj } from "@/app/assets/styles";
import {
  PostActiveButton,
  PostDeleteButton,
  PostFeaturedButton,
} from "@/components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { RiEditBoxLine } from "react-icons/ri";
import { SlOptionsVertical } from "react-icons/sl";

const EachPostActions = ({ userId, postDetails }) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <div className="flex justify-end items-center rounded-full bg-[#000]/10 dark:bg-[#fff]/10 p-2">
          <SlOptionsVertical size={13} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={`${globalStyleObj.backgroundLight900Dark200} border dark:border-[#fff]/10 font-poppins-rg text-dark-weight-400 dark:text-light-weight-450 min-w-[150px]`}
      >
        <DropdownMenuLabel className="dark:text-light-weight-800 tracking-wider">
          Edit Post
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* Edit Section */}
        <DropdownMenuItem className="flex items-center justify-between gap-2 text-[12px]">
          <span>Edit</span>
          <Link
            href={`/admin/blogs/posts/update/${postDetails._id}`}
            className="transition-300 rounded-full bg-[#49ABE0]/20 p-2 text-[#49ABE0] hover:bg-[#49ABE0] hover:text-white"
          >
            <RiEditBoxLine size={12} />
          </Link>
        </DropdownMenuItem>
        {/* Delete Section */}
        <DropdownMenuItem className="flex items-center justify-between gap-2 text-[12px]">
          <span>Delete</span>
          <PostDeleteButton userId={userId} postDetails={postDetails} />
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center justify-between gap-2 text-[12px]">
          <span>Active</span>
          <PostActiveButton userId={userId} postDetails={postDetails} />
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center justify-between gap-2 text-[12px]">
          <span>Featured</span>
          <PostFeaturedButton userId={userId} postDetails={postDetails} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EachPostActions;
