import React from "react";
import Image from "next/image";
import FacebookIcon from "@icons/components/SocialButton/facebookIcon.svg";
import TwitterIcon from "@icons/components/SocialButton/twitterIcon.svg";
import GithubIcon from "@icons/components/SocialButton/githubIcon.svg";
import LinkedinIcon from "@icons/components/SocialButton/linkedinIcon.svg";
interface buttonProps {
  icon: string;
  backgroundColor: string;
  title: string;
}
function SocialButton({ icon, backgroundColor, title }: buttonProps) {
  return (
    <div
      style={{ backgroundColor: backgroundColor }}
      className={`flex gap-[4px] cursor-pointer hover:opacity-80 w-fit items-center md:py-[5px] py-[13px] md:px-[22px] px-[13px] rounded-lg `}
    >
      <Image
        src={
          icon === "facebook"
            ? FacebookIcon
            : icon === "twitter"
            ? TwitterIcon
            : icon === "linkedin"
            ? LinkedinIcon
            : ""
        }
        width={100}
        height={100}
        alt={title}
        className="w-[12px] h-[12px]"
      ></Image>
      <div className="text-xs leading-[30px] md:block hidden text-white uppercase font-bold">
        {title}
      </div>
    </div>
  );
}

export default SocialButton;
