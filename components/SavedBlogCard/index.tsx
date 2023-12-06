import React from "react";
import Image from "next/image";
import Button from "@/components/Button";
import SampleImage from "@image/blogSample.png";
import { BlogDetail } from "@/utils/types";
import { timeAgo } from "@/utils/dayFormat";

interface IProps {
  value: BlogDetail;
}
function SavedBLogCard({ value }: IProps) {
  const maxContentLength = 250;
  const parser = new DOMParser();
  const doc = parser.parseFromString(value.content, "text/html");
  const blogText = doc.body.textContent ?? "";
  const truncatedText =
    blogText.length > maxContentLength
      ? blogText.substring(0, maxContentLength)
      : blogText;
  return (
    <div className="md:max-w-[calc((100%-40px)/2)] sm:w-full rounded-lg overflow-hidden w-full drop-shadow-lg shadow-lg">
      <div className="relative h-[200px]">
        <Image
          src={value.visual ?? SampleImage}
          alt="image"
          fill
          className="w-full object-cover"
        ></Image>
      </div>
      <div className="w-full flex gap-2 flex-col p-4">
        <div className="w-full items-stretch text-[20px] leading-[25px] font-bold ">
          {value.blog_title}
        </div>
        <div className="w-full flex items-center justify-between">
          <p className="text-[12px] cursor-pointer leading-[15px] text-[#0066B2] font-medium">
            {value.user_name}
          </p>
          <p className="text-[12px] cursor-pointer leading-[15px] text-[#0066B2] font-medium">
            {value.category_description}
          </p>
        </div>
        <div className="self-stretch text-justify h-[90px] overflow-hidden text-[14px] font-normal text-gray-500">
          {truncatedText + "....."}
        </div>
        <div className="w-full flex justify-between items-center ">
          <div className="w-full flex justify-between items-center">
            <Button
              textContent="Read more"
              icon="arrowRight"
              iconPosition="right"
              backgroundColor="bg-[#0066B2]"
              href={`/blog/detail/${value.blog_id}`}
              tailwind="hover:opacity-80"
            ></Button>
            <div className="text-gray-500 text-[12px] cursor-default font-medium">
              {value.published_at === null
                ? timeAgo(value.created_at)
                : timeAgo(value.published_at)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SavedBLogCard;
