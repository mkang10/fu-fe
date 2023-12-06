import React, { useState, useEffect } from "react";
import BlogTagField from "./TagField";
import axios from "axios";
import { getCookie } from "cookies-next";
import { getTagsByCategory } from "@/apis/tag";
import { Skeleton } from "@mui/material";
import { blogTags } from "@/utils/types";
interface tagProps {
  blogCategoryId: string;
  blogTags: string[];
  setBlogTags: React.Dispatch<React.SetStateAction<string[]>>;
  setBlogTagsId: React.Dispatch<React.SetStateAction<string[]>>;
}
function BlogTag({
  blogTags,
  setBlogTags,
  setBlogTagsId,
  blogCategoryId,
}: tagProps) {
  const allowTagNumber: number = 30;
  const placeholder = "Enter Tag...";
  const [tags, setTags] = useState<blogTags[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  useEffect(() => {
    const handleGetTags = async () => {
      try {
        const access_token = getCookie("accessToken");
        if (access_token) {
          const response = await getTagsByCategory(
            blogCategoryId,
            access_token
          );
          const data = response.data;
          setTags(data);
          const titles = data.map((tag: blogTags) => tag.title);
          setSuggestions(titles);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error);
        }
      }
    };
    handleGetTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-[8px]">
      <h3 className="text-base text-[#14375F] font-medium">Add Tag</h3>
      {suggestions.length > 0 ? (
        <div className="border-gray-300 rounded-[12px] w-full border-2 ">
          <BlogTagField
            allowTagNumber={allowTagNumber}
            suggestions={suggestions}
            state={blogTags}
            tags={tags}
            setState={setBlogTags}
            placeholder={placeholder}
            setBlogTagsId={setBlogTagsId}
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

export default BlogTag;
