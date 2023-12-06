"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import {
  AppstoreOutlined,
  UserOutlined,
  AppstoreAddOutlined,
  HomeOutlined,
  StarOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

function Sidebar(): JSX.Element {
  const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem => {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  };
  const isCollapsed = useSelector((state: RootState) => state.app.isCollapsed);
  const userId = useSelector((state: RootState) => state.user.currentUser.sub);
  const [current, setCurrent] = useState("/");
  const router = useRouter();
  const items: MenuItem[] = [
    getItem("Home", "/", <HomeOutlined />),


    getItem("Create Blog", "/blog/create", <AppstoreAddOutlined />),

    getItem("Blogs", "sub1", <AppstoreOutlined />, [
      getItem("Related Posts", "/blog/category-blog/list/1"),
      getItem("Posted Posts", "/blog/posted-blog/list/1"),
      getItem("Saved Posts", "/blog/saved-blog/list/1"),
    ]),

    getItem("Profile", "sub2", <UserOutlined />, [
      getItem("View Profile", `/profile/${userId}`),
      getItem("Profile Setting", `/profile/setting/${userId}`),
    ]),

    getItem("Award", "sub3", <StarOutlined />, [
      getItem("User Award", "/awards/useraward"),
      getItem("Moderator Award", "/awards/moderatoraward"),    
    ]),
  ];
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e.key);
    setCurrent(e.key);
    router.push(e.key);
  };
  return (
    <div
      className={`${
        isCollapsed ? "w-[90px]" : "w-[200px]"
      } fixed top-[56px] left-0 md:top-[64px] bg-white border-t-[1px] hidden lg:flex flex-col py-[20px] items-center z-40  h-screen border-r-[1px] select-none border-[#E8EBED]`}
    >
      <Menu
        onClick={onClick}
        style={{ border: "none" }}
        defaultSelectedKeys={[current]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="light"
        inlineCollapsed={isCollapsed}
        items={items}
      />
    </div>
  );
}

export default Sidebar;