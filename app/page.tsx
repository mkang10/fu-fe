"use client";
import FeaturedBlog from "@/components/sections/home/FeatureBlog";
import MajorBlog from "@/components/sections/home/MajorBlog";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

function Home() {
  const isCollapsed = useSelector((state: RootState) => state.app.isCollapsed);
  return (
    <main
      className={` absolute sm:w-full h-full ${
        isCollapsed ? "lg:w-[calc(100%-90px)]" : "lg:w-[calc(100%-200px)]"
      } flex flex-col justify-center duration-300 right-0 top-[64px] bottom-0 `}
    >
      <div className="w-full h-full ">
        <FeaturedBlog></FeaturedBlog>
        <MajorBlog></MajorBlog>
      </div>
    </main>
  );
}

export default Home;
