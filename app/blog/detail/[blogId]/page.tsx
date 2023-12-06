"use client";
import React, { useEffect, useState } from "react";
import { BlogDetail } from "@/utils/types";
import Content from "@/components/sections/detail/Content";
import RelatedBlog from "@/components/sections/detail/Related";
import Comment from "@/components/sections/detail/Comment";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { LinearProgress } from "@mui/material";
const socket = io("http://localhost:5000");
console.log(socket)
console.log(socket)
function BlogDetail() {
  const [blogData, setBlogData] = useState<BlogDetail>();
  const [isFetchingData, setIsFetchingData] = useState<boolean>(true);
  const isCollapsed = useSelector((state: RootState) => state.app.isCollapsed);
  useEffect(() => {
    setIsFetchingData(false);
  }, [blogData]);
  return (
    <>
      <main
        className={`absolute ${isCollapsed ? "lg:w-[calc(100%-90px)]" : "lg:w-[calc(100%-200px)]"
          } flex  duration-300 flex-col gap-[20px] right-0 top-[56px] lg:top-[64px] bottom-0 h-fit p-[20px] lg:p-[40px]`}
      >
        {isFetchingData ? (
          <LinearProgress></LinearProgress>
        ) : (
          <div>
            <Content
              socket={socket}
              setBlogData={setBlogData}
              blogData={blogData}
            ></Content>
            {/* <RelatedBlog></RelatedBlog> */}
            {/* <Comment socket={socket}></Comment> */}
          </div>
        )}
      </main>
    </>
  );
}

export default BlogDetail;
