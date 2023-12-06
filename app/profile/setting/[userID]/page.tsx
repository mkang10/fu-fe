"use client";
import React, { useEffect, useState } from "react";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import EditBio from "@/components/sections/profileSetting/EditBio";
import { getCookie } from "cookies-next";
import { getUserData } from "@/apis/profile";
import { UserSetting } from "@/utils/types";
import { LinearProgress } from "@mui/material";
import { useParams } from "next/navigation";
import EditAvatar from "@/components/sections/profileSetting/EditAvatar";
import ChangePassword from "@/components/sections/profileSetting/ChangePassword";
import GeneralInformation from "@/components/sections/profileSetting/GeneralInfomation";
function ProfileSetting() {
  const params = useParams();
  const user_id = params.userID as string;
  const isCollapsed = useSelector((state: RootState) => state.app.isCollapsed);
  const [userData, setUserData] = useState<UserSetting>();
  const [isFetchData, setIsFetchData] = useState<boolean>(true);
  const handleGetUserData = async () => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token && user_id) {
        const response = await getUserData(user_id, access_token);
        const data = response.data[0];
        setUserData(data);
        setIsFetchData(false);
      }
    } catch (error) {}
  };

  useEffect(() => {
    handleGetUserData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <main
        className={` absolute sm:w-full h-full ${
          isCollapsed ? "lg:w-[calc(100%-90px)]" : "lg:w-[calc(100%-200px)]"
        } flex duration-300 flex-col justify-center right-0 top-[64px] bottom-0`}
      >
        <div className="w-full h-full">
          <div className="p-[20px] md:p-[40px] w-full flex flex-col gap-5">
            <h1 className="text-[#14375F] font-bold md:text-[30px] md:leading-[45px] text-2xl">
              Profile Setting
            </h1>
            {isFetchData ? (
              <LinearProgress></LinearProgress>
            ) : (
              <div className="w-full flex flex-row justify-between">
                <div className="w-[calc(40%-8px)] flex flex-col gap-4">
                  <div className=" border-[1px] rounded-xl">
                    <EditAvatar
                      image={userData?.image!}
                      fullName={userData?.first_name!}
                      position={userData?.position!}
                    ></EditAvatar>
                  </div>
                  <div className=" border-[1px] rounded-xl">
                    <ChangePassword
                      user_id={userData?.user_id!}
                    ></ChangePassword>
                  </div>
                </div>
                <div className="w-[calc(60%-8px)] flex flex-col gap-4">
                  <div className=" border-[1px] rounded-xl">
                    <EditBio
                      user_id={userData?.user_id!}
                      about={userData?.bio!}
                    ></EditBio>
                  </div>
                  <div className=" border-[1px] rounded-xl">
                    <GeneralInformation
                      userData={userData!}
                    ></GeneralInformation>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default ProfileSetting;
