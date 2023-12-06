import React from "react";
import Image from "next/image";
import Button from "@/components/Button";
import { FeaturedCard } from "@/utils/types";
import { timeAgo } from "@/utils/dayFormat";
import SampleImage from "@image/blogSample.png";
interface IProps {
  value: FeaturedCard;
}
function BlogCard({ value }: IProps) {
  const maxContentLength = 250;
  const parser = new DOMParser();
  const doc = parser.parseFromString(value.content, "text/html");
  const blogText = doc.body.textContent || "";
  const truncatedText =
    blogText.length > maxContentLength
      ? blogText.substring(0, maxContentLength)
      : blogText;
  return (
    <div className="md:max-w-[calc((100%-60px)/3)] sm:w-full rounded-lg overflow-hidden w-full drop-shadow-lg shadow-lg">
      <div className="relative h-[200px]">
        <Image
          src={value.blogImage ?? SampleImage}
          alt="image"
          fill
          className="w-full object-cover"
        ></Image>
      </div>
      <div className="w-full flex gap-2 flex-col p-4">
        <div className="w-full items-stretch  text-[20px] leading-[25px] font-bold ">
          {value.blog_title}
        </div>
        <div className="w-full flex items-center justify-between">
          <p className="text-[12px] cursor-pointer leading-[15px] text-[#0066B2] font-medium">
            {value.postedBy}
          </p>
          <p className="text-[12px] cursor-pointer leading-[15px] text-[#0066B2] font-medium">
            {value.category}
          </p>
        </div>
        <div className="self-stretch  text-[14px] h-[130px] overflow-hidden font-normal text-gray-500">
          {truncatedText + "...."}
        </div>
        <div className="w-full flex justify-between items-center">
          <div className="text-gray-500 text-[12px] cursor-default font-medium">
            {timeAgo(value.created_at)}
          </div>
          <Button
            textContent="Read more"
            icon="arrowRight"
            iconPosition="right"
            backgroundColor="bg-[#0066B2]"
            href={`/blog/detail/${value.blog_id}`}
            tailwind="hover:opacity-80"
          ></Button>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
