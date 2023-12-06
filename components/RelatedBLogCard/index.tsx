import React from "react";
import SampleImage from "@image/blogSample.png";
import Image from "next/image";
import Button from "@/components/Button";
function RelatedBlogCard() {
  return (
    <div className="w-[calc((100%-60px)/3)] rounded-[6px] border-[1px]">
      <div className="w-full">
        <Image
          src={SampleImage}
          alt="smaple"
          style={{ width: "", height: "auto" }}
          className="w-full max-h-[300px] object-cover"
        ></Image>
      </div>
      <div className="w-full p-5 flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center gap-4">
            <div className="px-2 text-sm text-white py-1 bg-[#0066B2]">
              Nguyen Le Thien Duc
            </div>
            <div className="text-sm text-gray-500">5 min ago</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-2xl w-full">Game with reactjsreactjs</div>
            <div className="w-full text-base text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros.
            </div>
          </div>
        </div>
        <div className="w-full flex justify-start">
          <Button
            textContent="Read more"
            icon="arrowRight"
            iconPosition="right"
            backgroundColor="bg-[#0066B2]"
            href={`/blog/detail/`}
            tailwind="hover:opacity-80 "
          ></Button>
        </div>
      </div>
    </div>
  );
}

export default RelatedBlogCard;
