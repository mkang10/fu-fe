import React from "react";
import Image from "next/image";
import Logo from "@icons/logo/logo.svg";

function WelcomeSection() {
  return (
    <>
      <main className="w-full h-full flex flex-col items-center justify-center">
        <div className="w-full h-full p-5 flex flex-col">
          <div className="w-full flex justify-center">
            {" "}
            <Image
              src={Logo}
              alt="Picture of the author"
              className="w-[210px] h-auto mb-5"
            />
          </div>
          <div className="w-full text-center text-xl font-medium">
            Welcome to FU Blog Community, provide your information first and
            then start using our product. Remember to save at each step!
          </div>
        </div>
      </main>
    </>
  );
}

export default WelcomeSection;
