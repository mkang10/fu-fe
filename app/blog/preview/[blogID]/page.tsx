"use client";
import React, { useEffect, useState } from "react";
import { Button, message, Popconfirm } from "antd";
import SampleImage from "@image/blogSample.png";
import BackIcon from "@icons/page/blog/backIcon.svg";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { DeleteOutlined } from "@ant-design/icons";
import ClockIcon from "@icons/page/blog/clockIcon.svg";
import AvatarIcon from "@icons/page/blog/avatarIcon.svg";
import TagIcon from "@icons/page/blog/tagIcon.svg";
import BlogStatus from "@/components/BlogStatus";
import { getCookie } from "cookies-next";
import { BlogDetail } from "@/utils/types";
import { deleteBlog, getBlogByID } from "@/apis/blog";
import { formatDateDetail } from "@/utils/dayFormat";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { LinearProgress } from "@mui/material";
import { toast } from "react-toastify";
function DetailBLogList() {
  const [blogData, setBlogData] = useState<BlogDetail>();
  const currentUser = getCookie("user_id") as string;
  const isCollapsed = useSelector((state: RootState) => state.app.isCollapsed);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const param = useParams();
  const hanldeGetPost = async () => {
    try {
      const access_token = getCookie("accessToken");
      const blog_id = param.blogID as string;
      if (access_token && blog_id) {
        const blogResponse = await getBlogByID(blog_id, access_token);
        setBlogData(blogResponse.data[0]);
        setIsLoading(false);
      }
    } catch (error) {}
  };

  const handleDeleteBlog = async (blog_id: string) => {
    const access_token = getCookie("accessToken");
    try {
      if (access_token && currentUser) {
        if (currentUser === blogData?.user_id) {
          const response = await deleteBlog(blog_id, access_token);
          toast.success(response.data);
          router.push("/blog/posted-blog/list/1");
        } else {
          toast.error("You dont have permission to delete this blog");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    hanldeGetPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(blogData);

  return (
    <>
      <main
        className={`absolute ${
          isCollapsed ? "lg:w-[calc(100%-90px)]" : "lg:w-[calc(100%-200px)]"
        } flex flex-col gap-[20px] right-0 top-[56px] lg:top-[64px] bottom-0 h-fit p-[20px] lg:p-[40px]`}
      >
        {isLoading ? (
          <LinearProgress></LinearProgress>
        ) : (
          <div className="flex flex-col gap-5">
            <div className=" flex items-center justify-between">
              <h1 className=" w-4/5 text-3xl font-bold select-none">Preview</h1>
              <div
                onClick={() => router.back()}
                className=" w-1/5 flex justify-end items-center gap-[6px] cursor-pointer hover:gap-[10px] duration-300"
              >
                <Image
                  src={BackIcon}
                  className="md:h-[20px] md:w-[20px] w-[16px] h-[16px]"
                  height={18}
                  width={18}
                  style={{
                    width: "auto",
                    height: "auto",
                  }}
                  alt="Back"
                ></Image>
                <div className="text-gray-500 text-base md:text-lg font-medium ">
                  Go back
                </div>
              </div>
            </div>
            <div className="w-full h-full p-5 flex flex-col gap-4 rounded-[10px]  border-[2px]">
              <div className="w-full items-center justify-between flex">
                <h1 className="w-[90%] font-bold  text-3xl">
                  {blogData?.blog_title ?? "No title"}
                </h1>
                {currentUser === blogData?.user_id && (
                  <Popconfirm
                    placement="bottomRight"
                    okType="danger"
                    title="Delete this blog"
                    description="Are you sure to delete this blog?"
                    onConfirm={() => handleDeleteBlog(blogData.blog_id)}
                    okText="Yes"
                    cancelText="Cancel"
                  >
                    <div className="py-2 px-3 bg-[#ef3e3e] w-fit rounded-md hover:opacity-90 cursor-pointer">
                      <DeleteOutlined
                        style={{ color: "white", fontSize: "18px" }}
                      />
                    </div>
                  </Popconfirm>
                )}
              </div>
              {/* Author */}
              <div className="w-full flex-col flex gap-1">
                <div className="w-full flex items-center  gap-[10px]">
                  <Image
                    src={AvatarIcon}
                    alt="avatar by default"
                    height={20}
                    width={20}
                  ></Image>
                  <div className="text-gray-500 cursor-default text-base font-normal">
                    {blogData?.user_name}
                  </div>
                </div>
                <div className="w-full  flex items-center  gap-[10px]">
                  <Image
                    src={ClockIcon}
                    alt="avatar by default"
                    height={20}
                    width={20}
                  ></Image>
                  <div className="text-gray-500 cursor-default text-base font-normal">
                    {blogData?.created_at &&
                      formatDateDetail(blogData?.created_at)}
                  </div>
                </div>
              </div>
              {/* Category and Tag */}
              <div className="w-full flex-col flex gap-2">
                <div className="flex w-full items-center gap-2">
                  <Image src={TagIcon} alt="Tag" height={24} width={24}></Image>
                  <div className="bg-blue-100 cursor-default rounded-[6px] text-blue-800 text-sm px-[10px] py-1 font-medium">
                    {blogData?.category_description ?? "No category choosen"}
                  </div>
                </div>
                <div className="flex w-full items-center gap-2">
                  <Image src={TagIcon} alt="Tag" height={24} width={24}></Image>
                  <div className="w-full flex items-center gap-[10px]">
                    {blogData?.tags ? (
                      blogData.tags.map((tag, index) => (
                        <div
                          key={index}
                          className="bg-green-100 cursor-default rounded-[6px] text-green-800 text-sm px-[10px] py-1 font-medium"
                        >
                          {tag.title}
                        </div>
                      ))
                    ) : (
                      <p>No tag available</p>
                    )}
                  </div>
                </div>
              </div>
              {/* Content */}
              <div className="w-full flex items-center object-cover flex-col gap-4">
                <div className="relative max-w-[1200px] w-full h-[500px]">
                  <Image
                    fill
                    src={blogData?.visual ?? SampleImage}
                    alt="image of blog"
                    className="object-cover "
                  ></Image>
                </div>
                <div
                  className="w-full text-justify"
                  dangerouslySetInnerHTML={{
                    __html: blogData?.content!
                      ? blogData.content
                      : "No content",
                  }}
                ></div>
              </div>
              <div className="w-full flex justify-between">
                <p className=""> Reason: <span className="text-red-500">{blogData?.reject_reason ?? ""}</span></p>
                <BlogStatus status={blogData?.status}></BlogStatus>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default DetailBLogList;
