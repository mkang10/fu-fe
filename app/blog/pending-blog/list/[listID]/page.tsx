"use client";
import React, { useEffect, useState } from "react";
import PendingBlogCard from "@/components/PendingBlogCard";
import { getCookie } from "cookies-next";
import { getPendingBlog, rejectBlog, approveBlog, createReject } from "@/apis/blog";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toast } from "react-toastify";
import axios from "axios";
import { BlogDetail } from "@/utils/types";
import withAuthRole from "@/utils/hoc";
import PagePagination from "@/components/PagePagination";
import { LinearProgress } from "@mui/material";

interface PageProps {
  params: { listID: string };
}

interface PendingBlogProps {}

function PendingBlog({ params }: PageProps & PendingBlogProps) {
  const pageNumber = params.listID;
  const user_id = getCookie("user_id") as string
  const isCollapsed = useSelector((state: RootState) => state.app.isCollapsed);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [isFetchingData, setIsFetchingData] = useState<boolean>(true);
  const [blogData, setBlogData] = useState<BlogDetail[]>([]);
  const currentUserRole = useSelector(
    (state: RootState) => state.user.currentUser.UserRole
  );
  const currentUserStatus = useSelector(
    (state: RootState) => state.user.currentUser.moderateStatus
  );
   const handleGetPendingBlogs = async (page: number) => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        const response = await getPendingBlog(access_token, page);
        setBlogData(response.data.data);
        setTotalPage(response.data.total_pages);
        setIsFetchingData(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    handleGetPendingBlogs(Number(pageNumber));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  const removeCheckedBlog = (blog_id: string) => {
    setBlogData((prevData: BlogDetail[]) =>
      prevData.filter((blog: BlogDetail) => blog.blog_id !== blog_id)
    );
  };

  const hanldeApproveBlog = async (blogId: string) => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        if (currentUserRole === 1 && currentUserStatus) {
          await approveBlog(blogId, access_token);
          toast.success("Blog approved!");
          removeCheckedBlog(blogId);
        } else {
          toast.error("You don't have permission to approve the blog!");
        }
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 500) {
          toast.error(error.response.data);
        }
      }
    }
  };

  const handleRejectBlog = async (blogId: string, rejectionReason: string) => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        if (currentUserRole === 1) {
          const reject = {
            user_id: user_id,
            blog_id: blogId,
            reject_reason: rejectionReason
          }
          await rejectBlog(blogId, access_token);
          const response = await createReject(reject)
          console.log(response)
          toast.success("Blog rejected!");
          removeCheckedBlog(blogId);
        } else {
          toast.error("You don't have permission to reject the blog!");
        }
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 500) {
          toast.error(error.response.data);
        }
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
        {isFetchingData ? (
          <LinearProgress></LinearProgress>
        ) : (
          <div className="w-full h-full">
            <div className="mb-[40px] flex flex-col gap-5 w-full">
              <div className="w-full  ">
                <h1 className="text-[#14375F] font-bold md:text-[30px] md:leading-[45px] text-2xl">
                  Pending Blogs
                </h1>
              </div>
              <div className="w-full mb-5 flex md:flex-row sm:flex-col lg:gap-y-[30px] sm:gap-y-4 flex-wrap lg:gap-x-[30px] sm:gap-x-4">
                {blogData.map((data) => (
                  <PendingBlogCard
                    functionApprove={hanldeApproveBlog}
                    functionReject={handleRejectBlog}
                    key={data.blog_id}
                    value={data}
                  ></PendingBlogCard>
                ))}
              </div>
              <div className="w-full flex justify-end">
                <PagePagination
                  currentPage={pageNumber}
                  totalPages={totalPage}
                  route={"/blog/pending-blog/list/"}
                ></PagePagination>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default withAuthRole([1])(PendingBlog as React.FC<PendingBlogProps>);
