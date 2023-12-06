"use client";
// Import necessary modules and components
import React, { useEffect, useState } from "react";

import AwardModeratorCard from "@/components/AwardModeratorCard"; // You would need to create this component
import { getCookie } from "cookies-next";
 import { getAwardModerator} from "@/apis/awards"; // You would need to create this API function
import type { MenuProps } from "antd";
import { Button, Dropdown } from "antd";
import axios from "axios";
import { ModeratorAwards } from "@/utils/types"; // You would need to define this type
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import PagePagination from "@/components/PagePagination";
import { LinearProgress } from "@mui/material";



function AwardsPage() {
  const isCollapsed = useSelector((state: RootState) => state.app.isCollapsed);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isFetchingData, setIsFetchingData] = useState<boolean>(false);
  const [awardsData, setAwardsData] = useState<ModeratorAwards[]>([]);
  const [filter, setFilter] = useState<string>("1"); // Assuming 1 is the default filter for all awards
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <div onClick={() => setFilter("1")}>All Awards</div>,
    },
    // Add more filter options as needed
  ];

  const handleGetAwards = async () => {
  try {
    const access_token = getCookie("accessToken");
    if (access_token) {
      const response = await getAwardModerator(access_token);
      setAwardsData(response.data);
      console.log(response)
      setTotalPages(response.data.total_pages);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
  }
};
  useEffect(() => {
    handleGetAwards();
    setIsFetchingData(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <>
      <main
        className={`${
          isCollapsed ? "lg:w-[calc(100%-90px)]" : "lg:w-[calc(100%-200px)]"
        } absolute w-full duration-300 flex flex-col gap-[20px] right-0 top-[56px] lg:top-[64px] bottom-0 h-fit p-[20px] lg:p-[40px]`}
      >
        {isFetchingData ? (
          <LinearProgress></LinearProgress>
        ) : (
          <div className="w-full h-full ">
            <div className="mb-[40px] flex flex-col gap-5 w-full">
              <div className="w-full flex items-center justify-between  mb-5">
                <h1 className="text-[#14375F] font-bold md:text-[30px] md:leading-[45px] text-2xl">
                  Awards of Moderator
                </h1>
                <Dropdown menu={{ items }} placement="bottomRight" arrow>
                  <Button>Filter</Button>
                </Dropdown>
              </div>
              <div className="w-full flex md:flex-row sm:flex-col lg:gap-y-[30px] sm:gap-y-4 flex-wrap lg:gap-x-[30px] sm:gap-x-4 ">
                {awardsData !== null ? (
                  awardsData.map((data, index) => (
                    <AwardModeratorCard key={index} value={data}></AwardModeratorCard>
                  ))
                ) : (
                  <h1 className="text-[#14375F] font-bold md:text-[30px] md:leading-[45px] text-2xl">
                    No awards to display
                  </h1>
                )}
              </div>
              
            </div>
          </div>
        )}
      </main>
    </>
  );
}
export default AwardsPage;

