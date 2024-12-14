"use client";

import JoditEditor from "jodit-react";
import { useTheme } from "next-themes";
import React, { useState } from "react";
import { MdArrowForward } from "react-icons/md";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

import { globalStyleObj } from "@/app/assets/styles";
import { LabelText } from "@/components";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAppSelector } from "@/lib/store/hooks";
import { getCustomColor } from "@/lib/utils/customColor";

const AllPostsForm = () => {
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );
  const [blogFieldsObject, setBlogFieldsObject] = useState({
    title: "",
    category: "",
    slug: "",
    shortDescription: "",
    description: "",
    metaTitle: "",
    metaDescription: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const { theme } = useTheme();
  const customColor = getCustomColor({ layoutThemePrimaryColorType });
  const { bgColor, hoverBgColor, textColor } = customColor;

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setBlogFieldsObject((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const postFormOnSubmit = async (e) => {
    e.preventDefault();

    if (
      blogFieldsObject.title &&
      blogFieldsObject.category &&
      blogFieldsObject.slug &&
      blogFieldsObject.shortDescription
    ) {
      try {
        setIsProcessing(true);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/post/create-post`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ blogFieldsObject }),
          }
        );

        const data = await response.json();

        if (response.ok && data.success) {
          toast.success(data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setBlogFieldsObject({
            title: "",
            category: "",
            slug: "",
            shortDescription: "",
            description: "",
            metaTitle: "",
            metaDescription: "",
          });
        } else {
          if (typeof data.message === "string") {
            toast.error(data.message, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else if (typeof data.message === "object") {
            Object.values(data.message).map((err, i) =>
              toast.error(err[0], {
                position: "top-right",
                autoClose: 3000 * (i + 1),
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              })
            );
          }
        }
      } catch (error) {
        console.log("Error in creating the blog post: ", error);
      } finally {
        setIsProcessing(false);
      }
    } else {
      toast.error("Required fields are missing.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const commonInputContainerClass =
    "flex w-full flex-col justify-between gap-3 xl:flex-row";
  const commonDefaultInputFieldClass =
    "w-full max-w-[800px] border py-5 font-poppins-rg text-[13px] text-dark-weight-500 focus-visible:outline-none focus-visible:ring-0 dark:border-[#fff]/10 dark:bg-[#000]/10 dark:text-light-weight-400";

  return (
    <form
      onSubmit={postFormOnSubmit}
      className={`${globalStyleObj.backgroundLight900Dark300} mt-[40px] min-h-full rounded-sm p-3 shadow-light sm:p-5`}
    >
      {/* Blog Title */}
      <div className={commonInputContainerClass}>
        <LabelText text="Blog Title" htmlForId="blog-title" star={true} />
        <Input
          id="blog-title"
          type="text"
          name="title"
          value={blogFieldsObject.title}
          onChange={handleOnChange}
          placeholder="Blog Title"
          className={commonDefaultInputFieldClass}
        />
      </div>

      {/* Category */}
      <div className={`mt-5 ${commonInputContainerClass}`}>
        <LabelText text="Category" htmlForId="blog-category" star={true} />
        <Select
          id="blog-category"
          value={blogFieldsObject.category}
          onValueChange={(value) => {
            setBlogFieldsObject((prevState) => ({
              ...prevState,
              category: value,
            }));
          }}
        >
          <SelectTrigger className="w-full max-w-[800px] border py-5 font-poppins-rg text-[13px] text-dark-weight-550 dark:border-[#fff]/10 dark:bg-[#000]/10 dark:text-light-weight-400">
            <SelectValue placeholder="--" className="border " />
          </SelectTrigger>
          <SelectContent
            className={`border-0 ${globalStyleObj.backgroundLight900Dark200} font-poppins-rg text-[13px] text-dark-weight-550 dark:text-light-weight-550`}
          >
            <SelectGroup>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="lifestyle">Lifestyle</SelectItem>
              <SelectItem value="health & wellness">
                Health & Wellness
              </SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="travel">Travel</SelectItem>
              <SelectItem value="food & recipes">Food & Recipes</SelectItem>
              <SelectItem value="finance & business">
                Finance & Business
              </SelectItem>
              <SelectItem value="entertainment">Entertainment</SelectItem>
              <SelectItem value="science & innovation">
                Science & Innovation
              </SelectItem>
              <SelectItem value="sports & fitness">Sports & Fitness</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Slug */}
      <div className={`mt-5 ${commonInputContainerClass}`}>
        <LabelText text="Slug" htmlForId="blog-slug" star={true} />
        <Input
          id="blog-slug"
          type="text"
          name="slug"
          value={blogFieldsObject.slug}
          onChange={handleOnChange}
          placeholder="Slug"
          className={commonDefaultInputFieldClass}
        />
      </div>

      {/* Banner (1300 x 650) */}
      <div className={`mt-5 ${commonInputContainerClass}`}>
        <LabelText
          text="Banner (1300 x 650)"
          htmlForId="blog-banner-img"
          star={false}
        />
        <Input
          id="blog-banner-img"
          type="file"
          className={`size-full max-w-[800px] border p-0 text-[13px] text-dark-weight-500 dark:border-[#fff]/10 dark:bg-[#000]/10 dark:text-light-weight-400`}
        />
      </div>

      {/* Short Description */}
      <div className={`mt-5 ${commonInputContainerClass}`}>
        <LabelText
          text="Short Description"
          htmlForId="blog-short-description"
          star={true}
        />
        <Textarea
          id="blog-short-description"
          name="shortDescription"
          value={blogFieldsObject.shortDescription}
          onChange={handleOnChange}
          className={`h-[100px] ${commonDefaultInputFieldClass}`}
        />
      </div>

      {/* Description */}
      <div className={`mt-5 ${commonInputContainerClass}`}>
        <LabelText
          text="Description"
          htmlForId="blog-description"
          star={false}
        />

        <div className="w-full max-w-[800px] rounded-sm border dark:border-[#fff]/10">
          <JoditEditor
            config={{
              placeholder: "",
              showCharsCounter: false,
              showWordsCounter: false,
              showXPathInStatusbar: false,
              height: 300,
              style: {
                backgroundColor: theme === "light" ? "#ffffff" : "#22262A",
                color: theme === "light" ? "#495057" : "#ced4da",
              },
              toolbarAdaptive: true,
              toolbarButtonSize: "middle",
              toolbar: true,
            }}
            value={blogFieldsObject.description}
            onBlur={(newContent) => {
              setBlogFieldsObject((prevState) => ({
                ...prevState,
                description: newContent,
              }));
            }}
          />
        </div>
      </div>

      {/* Meta Title */}
      <div className={`mt-5 ${commonInputContainerClass}`}>
        <LabelText text="Meta Title" htmlForId="blog-meta-title" star={false} />
        <Input
          id="blog-meta-title"
          type="text"
          name="metaTitle"
          value={blogFieldsObject.metaTitle}
          onChange={handleOnChange}
          placeholder="Meta Title"
          className={commonDefaultInputFieldClass}
        />
      </div>

      {/* Meta Image (200 x 200) */}
      <div className={`mt-5 ${commonInputContainerClass}`}>
        <LabelText
          text="Meta Image (200 x 200)"
          htmlForId="blog-meta-img"
          star={false}
        />
        <Input
          id="blog-meta-img"
          type="file"
          className={`size-full max-w-[800px] border p-0 text-[13px] text-dark-weight-500 dark:border-[#fff]/10 dark:bg-[#000]/10 dark:text-light-weight-400`}
        />
      </div>

      {/* Meta Description */}
      <div className={`mt-5 ${commonInputContainerClass}`}>
        <LabelText
          text="Meta Description"
          htmlForId="blog-meta-description"
          star={false}
        />
        <Textarea
          id="blog-meta-description"
          name="metaDescription"
          value={blogFieldsObject.metaDescription}
          onChange={handleOnChange}
          className={`h-[100px] ${commonDefaultInputFieldClass}`}
        />
      </div>

      <div className="mt-10 flex items-center justify-center">
        <button
          type="submit"
          className={`mx-auto ${globalStyleObj.flexStart} transition-300 gap-2 rounded-[4px] ${bgColor} ${hoverBgColor} ${textColor} px-5 py-2 font-poppins-rg text-[16px] tracking-wide hover:text-white`}
        >
          {isProcessing ? (
            <>
              <ClipLoader />
              <span>Processing...</span>
            </>
          ) : (
            <>
              Create Post
              <MdArrowForward />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default AllPostsForm;
