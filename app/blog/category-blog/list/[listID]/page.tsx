"use client";
import React, { useEffect, useState } from "react";
import BlogCard from "@/components/BlogCard";
import SearchIcon from "@icons/page/blog/searchIcon.svg";
import { Category, FeaturedCard } from "@/utils/types";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getCookie } from "cookies-next";
import { getAllCategory } from "@/apis/category";
import { getUserInfoWithCategoryId } from "@/utils/hooks";
import { getListMajorBlogs } from "@/apis/blog";
import PagePagination from "@/components/PagePagination";
interface PageProps {
  params: { listID: string };
}
function CategoryBlog({ params }: PageProps) {
  const pageNumber = params.listID;
  const isCollapsed = useSelector((state: RootState) => state.app.isCollapsed);
  const [blogData, setBlogData] = useState<FeaturedCard[]>([]);
  const [categoryData, setCategoryData] = useState<Category[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const handleGetAllCategories = async () => {
      try {
        const accessToken = getCookie("accessToken");
        if (accessToken) {
          const response = await getAllCategory(accessToken);
          setCategoryData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleGetAllCategories();
  }, []);

  const handleGetMajorBlogs = async (page: number) => {
    try {
      const accessToken = getCookie("accessToken");
      if (accessToken) {
        const department = getCookie("department") as string;
        if (department && categoryData) {
          const categoryID = getUserInfoWithCategoryId(
            department,
            categoryData
          );
          if (categoryID) {
            const response = await getListMajorBlogs(
              categoryID,
              accessToken,
              page
            );
            setBlogData(response.data.data);
            setTotalPages(response.data.total_pages);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetMajorBlogs(Number(pageNumber));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryData, pageNumber]);
  return (
    <>
      <main
        className={`${
          isCollapsed ? "lg:w-[calc(100%-90px)]" : "lg:w-[calc(100%-200px)]"
        } absolute w-full duration-300 flex flex-col gap-[20px] right-0 top-[56px] lg:top-[64px] bottom-0 h-fit p-[20px] lg:p-[40px]`}
      >
        <div className="w-full h-full ">
          <div className="w-full  mb-5">
            <h1 className="text-[#14375F] font-bold md:text-[30px] md:leading-[45px] text-3xl">
              Category Blogs
            </h1>
          </div>
          <div className="w-full mb-5 flex md:flex-row sm:flex-col lg:gap-y-[30px] sm:gap-y-4 flex-wrap lg:gap-x-[30px] sm:gap-x-4 ">
            {blogData.map((data) => (
              <BlogCard key={data.blog_id} value={data}></BlogCard>
            ))}
          </div>
          <div className="w-full flex justify-end">
            <PagePagination
              currentPage={pageNumber}
              totalPages={totalPages}
              route={"/blog/category-blog/list/"}
            ></PagePagination>
          </div>
        </div>
      </main>
    </>
  );
}

export default CategoryBlog;
