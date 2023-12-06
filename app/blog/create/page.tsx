"use client";
import React, { useState } from "react";
import BackIcon from "@icons/page/blog/backIcon.svg";
import "@/app/globals.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import BlogTag from "@/components/BlogTag";
import CategoryTag from "@/components/CategoryTag";
import BrowseMedia from "@/components/BrowseMedia";
import EditorBlog from "@component/EditorBlog";
import { getCookie } from "cookies-next";
import axios from "axios";
import { createBlog, createBlogTags } from "@/apis/blog";
import { toast } from "react-toastify";
import ModifyButton from "@component/ModifyButton";
import { Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import paperAirline from "@icons/components/Button/paper-airplane.svg";

function EditBlog() {
  const isCollapsed = useSelector((state: RootState) => state.app.isCollapsed);
  const [blogTitle, setBlogTitle] = useState<string>("");
  const [blogCategory, setBlogCategory] = useState<string>("");
  const [blogCategoryId, setBlogCategoryId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [blogTags, setBlogTags] = useState<string[]>([]);
  const [blogTagsId, setBlogTagsId] = useState<string[]>([]);
  const [importedImage, setImportedImage] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string | undefined | null>(null);
  const [htmlString, setHtmlStringg] = useState<string>("");
  const router = useRouter();
  const handleCreateBlog = async () => {
    if (!blogTitle.trim()) {
      toast.error("Please enter a blog title");
      return;
    }

    if (!blogCategory) {
      toast.error("Please select a blog category");
      return;
    }
    const access_token = getCookie("accessToken");
    const user_id = getCookie("user_id");
    try {
      if (access_token && user_id) {
        setIsLoading(true);
        const newBlog = {
          user_id: user_id,
          blogTitle: blogTitle,
          category_id: blogCategoryId,
          htmlString: htmlString,
          status: 0,
          visual: imageURL,
        };
        const createdBlog = await createBlog(newBlog);
        const blog_id = createdBlog.blog_id;
        const newBlogTags = {
          blog_id: blog_id,
          tags: blogTagsId,
        };
        await createBlogTags(newBlogTags);
        toast.success("Blog posted! Please wait for the moderator!");
        setTimeout(() => {
          router.push("/blog/posted-blog/list/1");
        }, 500);
        setIsLoading(false);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err);
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <main
        className={`${
          isCollapsed ? "lg:w-[calc(100%-90px)]" : "lg:w-[calc(100%-200px)]"
        } absolute w-full duration-300 flex flex-col gap-[20px] right-0 top-[56px] lg:top-[64px] bottom-0 h-fit p-[20px] lg:p-[40px]`}
      >
        <div className="w-full flex items-center justify-between">
          <h1 className=" relative md:text-[30px] md:leading-[45px] text-3xl  font-bold select-none">
            Create Blog
          </h1>
          <div
            onClick={() => router.back()}
            className="flex items-center gap-[6px] cursor-pointer hover:gap-[10px] duration-300"
          >
            <Image
              src={BackIcon}
              className="md:h-[20px] md:w-[20px] w-[16px] h-[16px]"
              height={20}
              width={20}
              alt="Back"
            ></Image>
            <div className="text-[#707070] text-base md:text-xl md:leading-[24px] font-medium ">
              Go Back
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between items-center">
          <div className="w-[calc(50%-20px)] flex flex-col gap-2">
            <h3 className="text-base text-[#14375F] font-medium">
              Blog&#39;s Title:
            </h3>
            <input
              onChange={(e) => setBlogTitle(e.target.value)}
              type="text"
              placeholder="Write title here"
              className="border-2 px-3 py-3 outline-[#0066B2] border-gray-300 rounded-[12px] w-full"
            />
          </div>
          <div className="w-[calc(50%-20px)] flex flex-col gap-2">
            <CategoryTag
              blogCategory={blogCategory}
              setBlogCategory={setBlogCategory}
              setBlogCategoryId={setBlogCategoryId}
            ></CategoryTag>
          </div>
        </div>
        <div>
          <BrowseMedia
            formTitle="Your image or video"
            fileStorage={importedImage}
            setFileStorage={setImportedImage}
            setFileURL={setImageURL}
            page="create_blog"
          ></BrowseMedia>
        </div>
        <div>
          {blogCategoryId ? (
            <BlogTag
              blogCategoryId={blogCategoryId}
              blogTags={blogTags}
              setBlogTags={setBlogTags}
              setBlogTagsId={setBlogTagsId}
            />
          ) : (
            <div className="flex flex-col gap-[8px]">
              <h3 className="text-base text-[#14375F] font-medium">Add Tag</h3>
              <div className="border-gray-300 rounded-[12px] w-full border-2 overflow-hidden">
                <Skeleton
                  sx={{ bgcolor: "grey.100" }}
                  variant="rectangular"
                  animation="wave"
                  height={51}
                ></Skeleton>
              </div>
            </div>
          )}
        </div>
        <div>
          <EditorBlog
            formTitle="Your content"
            htmlString={htmlString}
            setHtmlString={setHtmlStringg}
            pageName="create_blog"
          ></EditorBlog>
        </div>

        <div className="mt-[12px] flex flex-row justify-between">
          <div>
            <button
              className={`rounded-[8px]  disabled:opacity-80 px-[12px] py-[8px] text-[12px] bg-blue-700 text-white`}
              onClick={handleCreateBlog}
              disabled={isLoading}
            >
              <div
                className="flex gap-[8px]"
                // style={{
                //   flexDirection: "left",
                // }}
              >
                <Image
                  src={paperAirline}
                  alt="public"
                  style={{
                    width: "16px",
                    height: "17px",
                  }}
                />
                <p>Publish blog</p>
              </div>
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default EditBlog;
