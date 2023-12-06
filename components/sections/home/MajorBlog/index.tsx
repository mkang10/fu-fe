"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MoreIcon from "@icons/home/moreIcon.png";
import BlogCard from "@/components/BlogCard";
import { getCookie } from "cookies-next";
import { Category, FeaturedCard } from "@/utils/types";
import { getUserInfoWithCategoryId } from "@/utils/hooks";
import { getAllCategory } from "@/apis/category";
import { getMajorBlogs } from "@/apis/blog";
function MajorBlog() {
  const [majorBlog, setMajorBlog] = useState<FeaturedCard[]>([]);
  const [categoryData, setCategoryData] = useState<Category[]>([]);
  const handleGetAllCategories = async () => {
    const accessToken = getCookie("accessToken");
    try {
      if (accessToken) {
        const response = await getAllCategory(accessToken);
        setCategoryData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAllCategories();
  }, []);

  useEffect(() => {
    const handleGetMajorBlogs = async () => {
      const accessToken = getCookie("accessToken");
      if (accessToken) {
        const department = getCookie("department") as string;
        if (department && categoryData) {
          const categoryID = getUserInfoWithCategoryId(
            department,
            categoryData
          );
          if (categoryID) {
            const response = await getMajorBlogs(categoryID, accessToken);
            setMajorBlog(response.data);
          }
        }
      }
    };
    handleGetMajorBlogs();
  }, [categoryData]);
  return (
    <>
      <div className="mb-[40px] p-[20px] md:p-[40px] w-full">
        <div className="w-full flex items-center justify-between mb-5">
          <h1 className="text-[#14375F] font-bold md:text-[30px] md:leading-[45px] text-2xl">
            Your Major&#39;s Blogs
          </h1>
          <Link
            href={"/blog/category-blog/list/1"}
            className="flex items-center gap-[6px] cursor-pointer hover:gap-[10px] duration-300"
          >
            <Image
              src={MoreIcon}
              className="md:h-[20px] md:w-[20px] w-[16px] h-[16px]"
              height={20}
              width={20}
              alt="viewmore"
            ></Image>
            <div className="text-[#0066B2] text-base md:text-xl md:leading-[24px] font-medium ">
              View more
            </div>
          </Link>
        </div>
        <div className="w-full flex md:flex-row sm:flex-col lg:gap-y-[30px] sm:gap-y-4 flex-wrap justify-between">
          {majorBlog.map((data) => (
            <BlogCard key={data.blog_id} value={data}></BlogCard>
          ))}
        </div>
      </div>
    </>
  );
}

export default MajorBlog;
