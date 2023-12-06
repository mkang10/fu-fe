"use client";
import React, { useEffect, useState } from "react";
import HorizonCard from "@/components/HorizonCard";
import { FeaturedCard } from "@/utils/types";
import { getCookie } from "cookies-next";
import { getFeaturedBlog } from "@/apis/blog";

function FeaturedBlog() {
  const [featuredList, setFeaturedList] = useState<FeaturedCard[]>([]);
  useEffect(() => {
    const handleGetFeaturedPosts = async () => {
      const accessToken = getCookie("accessToken");
      try {
        if (accessToken) {
          const response = await getFeaturedBlog(accessToken);
          setFeaturedList(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleGetFeaturedPosts();
  }, []);
  return (
    <div className=" p-[20px] md:p-[40px] w-full">
      <div className="w-full flex items-center justify-between mb-5">
        <h1 className="text-[#14375F] font-bold md:text-[30px] md:leading-[45px] text-2xl">
          Feature Posts
        </h1>
      </div>
      <div className="w-full flex flex-col gap-4 flex-wrap justify-between">
        {featuredList.map((data) => (
          <HorizonCard key={data.blog_id} value={data}></HorizonCard>
        ))}
      </div>
    </div>
  );
}

export default FeaturedBlog;
