import React from "react";
import Link from "next/link";
import ProfileImg from "@icons/header/profileImage.svg";
import Image from "next/image";
interface DropDownProps {
  functionHandleLogout: () => void;
}
function AdminDropDown({ functionHandleLogout }: DropDownProps) {
  return (
    <div className="absolute right-[15px] bottom-[-358px]  w-[300px]  bg-white border-[1px] border-[#E8EBED] rounded-[12px] shadow-lg p-4">
      <div className="w-full pb-4 border-b-[1px] border-[#E8EBED] flex gap-[10px] items-center">
        <Image
          src={ProfileImg}
          alt="Profile Image"
          height={60}
          width={60}
          className="object-cover"
        ></Image>
        <div className="flex w-full flex-col gap-[4px]">
          <div className="w-full text-[18px] text-[#14375F] leading-[22px]">
            Nguyen Le Thien Duc
          </div>
          <div className="w-full text-sm font-medium leading-[19px] text-[#707070]">
            @ducnltde170123
          </div>
        </div>
      </div>
      <div className="py-4 border-b-[1px] gap-[10px] flex flex-col  border-[#E8EBED] text-[#707070]">
        <Link className="hover:text-[#14375F]" href={""}>
          View Member List
        </Link>
        <Link className="hover:text-[#14375F]" href={""}>
          View Pending Blogs
        </Link>
      </div>
      <div className="py-4 border-b-[1px] gap-[10px] flex flex-col  border-[#E8EBED] text-[#707070]">
        <Link className="hover:text-[#14375F]" href={""}>
          Create Category
        </Link>
        <Link className="hover:text-[#14375F]" href={""}>
          Create Tag
        </Link>
      </div>
      <div className="pt-4  gap-[10px] flex flex-col   text-[#707070]">
        <Link className="hover:text-[#14375F]" href={""}>
          Settings
        </Link>
        <div onClick={functionHandleLogout} className="hover:text-[#14375F]">
          Log Out
        </div>
      </div>
    </div>
  );
}

export default AdminDropDown;
