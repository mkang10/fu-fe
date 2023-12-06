import Image from "next/image";
import React from "react";
import DefaultAvatar from "@icons/header/defaultAvatar.svg";
import { FeaturedCard } from "@/utils/types";
import SampleImage from "@image/blogSample.png";
import { timeAgo } from "@/utils/dayFormat";
import Link from "next/link";
interface IProps {
  value: FeaturedCard;
}
function HorizonCard({ value }: IProps) {
  const maxContentLength = 250;
  const parser = new DOMParser();
  const doc = parser.parseFromString(value.content, "text/html");
  const blogText = doc.body.textContent || "";
  const truncatedText =
    blogText.length > maxContentLength
      ? blogText.substring(0, maxContentLength)
      : blogText;
  return (
    <>
      <div className="w-full h-full p-5  border-[2px] gap-4 flex flex-col rounded-[12px] overflow-hidden">
        <div className="flex flex-row gap-2 items-center">
          <Image
            src={value.userImage ?? DefaultAvatar}
            width={100}
            height={100}
            alt="User avatar"
            className="w-[30px] rounded-[50%] h-[30px] object-cover"
          ></Image>
          <Link href={`profile/${value.user_id}`}>
            <p className=" cursor-pointer text-base text-[#0066B2] font-medium">
              {value.postedBy}
            </p>
          </Link>
        </div>
        <div className="flex flex-row">
          <div className="w-full h-full p-4 gap-2  flex flex-col ">
            <Link href={`blog/detail/${value.blog_id}`}>
              <div className="w-full items-stretch text-[20px] leading-[25px] font-bold ">
                {value.blog_title}
              </div>
            </Link>
            <div className="self-stretch  text-[14px] font-normal text-gray-500">
              {truncatedText + "...."}
            </div>
            <div className="w-full flex gap-5 items-center">
              <div className="p-3 rounded-[12px] bg-slate-100">
                <p className="text-[12px] cursor-pointer leading-[15px] text-[#0066B2] font-medium">
                  {value.category}
                </p>
              </div>
              <div className="text-gray-500 text-[12px] cursor-default font-medium">
                {timeAgo(value.created_at)}
              </div>
            </div>
          </div>
          <Link href={`blog/detail/${value.blog_id}`}>
            <Image
              src={value.blogImage ?? SampleImage}
              alt="Image of blog"
              width={240}
              height={240}
              className="object-fill rounded-[8px]"
            ></Image>
          </Link>
        </div>
      </div>
    </>
  );
}

export default HorizonCard;
