import { NotificationItem } from "@/utils/types";
import Image from "next/image";
import React from "react";
import SampleImage from "@image/blogSample.png";
import { timeAgo } from "@/utils/dayFormat";
import Link from "next/link";
interface NotificationProps {
  notiList: NotificationItem[];
}
function Notification({ notiList }: NotificationProps) {
  return (
    <div className="w-[450px] flex flex-col max-h-[300px] overflow-y-scroll bg-white rounded-[10px] border-[1px] drop-shadow-md px-4 py-4">
      <div className="font-semibold text-base pb-1 border-b-2 mb-2">
        All Notifications
      </div>
      <div className="flex flex-col gap-1">
        {notiList.map((noti) => (
          <Link
            href={`/notification/detail/${noti.notification_id}`}
            key={noti.notification_id}
          >
            <div className="flex flex-row gap-2 p-2 hover:bg-gray-100 rounded-xl">
              <div className="h-[40px] relative w-[40px] rounded-[50%] overflow-hidden ">
                <Image
                  fill
                  alt="NotiImage"
                  src={noti.image ?? SampleImage}
                  className="object-cover w-[60px]"
                ></Image>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-sm font-semibold">{noti.title}</div>
                <div className="text-[12px] font-normal text-gray-400">
                  {timeAgo(noti.created_at)}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Notification;
