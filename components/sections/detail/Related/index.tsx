import RelatedBlogCard from "@/components/RelatedBLogCard";
import React from "react";

function RelatedBlog() {
  return (
    <>
      <div className="w-full pt-[20px] pb-[40px] gap-[20px] flex flex-col">
        <div className="text-2xl font-bold text-[#14375F] ">Related Posts</div>
        <div className="w-full flex flex-row flex-wrap justify-between">
          <RelatedBlogCard></RelatedBlogCard>
        </div>
      </div>
    </>
  );
}

export default RelatedBlog;
