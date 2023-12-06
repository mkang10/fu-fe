import React from "react";
import Image from "next/image";
import { ModeratorAwards } from "@/utils/types"; 
import sampleAvatar from "@image/sampleImage.png";
import Button from "@/components/Button";

interface IProps {
 value: ModeratorAwards;
}

function AwardModeratorCard({ value }: IProps) {
  return (
    <div className="md:max-w-[calc((100%-60px)/3)] sm:w-full rounded-lg overflow-hidden w-full drop-shadow-lg shadow-lg">
      <div className="relative h-[200px]">
        {/* Assuming there is an image associated with the award, replace with your own */}
        <Image
          src={value.image ?? sampleAvatar }
          alt="award"
          fill
          className="w-full object-cover"
        ></Image>
      </div>
      
      <div className="w-full flex gap-2 flex-col p-4">
      <div className="w-full items-stretch  text-[20px] leading-[25px] font-bold ">
         {value.full_name ?? "Not set yet"}
        </div>
        <div className="w-full flex justify-between items-center">
          <Button
            textContent=" User detail"
            icon="arrowRight"
            iconPosition="right"
            backgroundColor="bg-[#0066B2]"
            // Assuming there is a route for the award details page, replace with your own
            href={`/profile/${value.user_id}`}
  
            tailwind="hover:opacity-80"
          ></Button>
        </div>
      </div>  
    </div>
  );
}

export default AwardModeratorCard;