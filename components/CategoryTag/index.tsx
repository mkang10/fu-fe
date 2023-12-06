import React, { useState, useEffect } from "react";
import BlogTagField from "@component/CategoryTag/TagField";
import axios from "axios";
import { getCookie } from "cookies-next";
import { getAllCategory } from "@/apis/category";
import { Skeleton } from "@mui/material";
import { blogCategory } from "@/utils/types";

interface categoryProps {
  setBlogCategoryId: React.Dispatch<React.SetStateAction<string>>;
  setBlogCategory: React.Dispatch<React.SetStateAction<string>>;
  blogCategory: string;
}
function CategoryTag({
  setBlogCategory,
  blogCategory,
  setBlogCategoryId,
}: categoryProps) {
  const allowTagNumber: number = 1;
  const placeholder = "Enter Category...";
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [categories, setCategories] = useState<blogCategory[]>([]);
  useEffect(() => {
    const hanldeGetAllCategoryData = async () => {
      try {
        const access_token = getCookie("accessToken");
        if (access_token) {
          const response = await getAllCategory(access_token);
          const data = response.data;
          setCategories(data);
          const description = data.map(
            (category: blogCategory) => category.description
          );
          setSuggestions(description);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error);
        }
      }
    };
    hanldeGetAllCategoryData();
  }, []);

  return (
    <div className="flex flex-col gap-[8px]">
      <div>
        <h3 className="text-base text-[#14375F] font-medium">Add Category</h3>
      </div>
      {suggestions.length > 0 ? (
        <div className="border-gray-300 rounded-[12px] w-full border-2 ">
          <BlogTagField
            categories={categories}
            allowTagNumber={allowTagNumber}
            suggestions={suggestions}
            setStateId={setBlogCategoryId}
            state={blogCategory}
            setState={setBlogCategory}
            placeholder={placeholder}
          />
        </div>
      ) : (
        <div className="border-gray-300 rounded-[12px] w-full border-2 overflow-hidden">
          <Skeleton
            sx={{ bgcolor: "grey.100" }}
            variant="rectangular"
            animation="wave"
            height={51}
          ></Skeleton>
        </div>
      )}
    </div>
  );
}

export default CategoryTag;
