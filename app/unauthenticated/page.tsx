import React from "react";
import Image from "next/image";
import Logo from "@icons/logo/logo.svg";
import Link from "next/link";
const navigation = [
  {
    title: "Home",
    href: "",
  },
  {
    title: "Stories",
    href: "",
  },
  {
    title: "Contact",
    href: "",
  },
];
function UnauthenticatedPage() {
  return (
    <>
      <div className="top-0 left-0 right-0 w-full fixed z-[1] bg-[#ffffff] backdrop-blur-sm border-b-2 border-b-[#E8EBED]">
        <div className="w-full mx-auto h-[56px] lg:h-[64px] px-[20px] md:px-[40px] flex justify-between items-center">
          <Link href="/">
            <Image
              priority={true}
              src={Logo}
              width={100}
              height={100}
              className="h-[32px] w-auto hidden lg:block"
              alt="Logo of author"
            />
          </Link>
          <div className="flex items-center gap-[40px]">
            {navigation.map((items, index) => (
              <Link key={index} href={""}>
                <div className="text-base leading-[19px] hover:opacity-80 text-[#14375F] font-medium ">
                  {" "}
                  {items.title}
                </div>
              </Link>
            ))}
            <div className="flex items-center gap-5">
              {" "}
              <Link href={"/auth/sign-in"}>
                <button className="px-5 py-2 bg-[#0066B2] duration-200 text-base leading-[19px] font-bold text-white hover:opacity-80">
                  Sign In
                </button>
              </Link>{" "}
              <Link href={"/auth/sign-up"}>
                <button className="px-5 py-2 bg-[#F27024] duration-200 text-base leading-[19px] font-bold text-white hover:opacity-80">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UnauthenticatedPage;
